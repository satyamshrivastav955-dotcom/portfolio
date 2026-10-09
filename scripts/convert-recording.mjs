import sharp from 'sharp';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

// Optional maintainer utility. Uses a real repository GIF; no frames are simulated here.
const input = process.env.RECORDING_INPUT ?? '/tmp/omnirush/nexus-demo.gif';
const ffmpeg = process.env.FFMPEG_PATH ?? 'ffmpeg';
const output = new URL('../public/projects/nexus-execution.webm', import.meta.url).pathname;
const image = sharp(input, { animated: true });
const metadata = await image.metadata();
const raw = await image.raw().toBuffer();
const { width, pageHeight, pages, channels, delay } = metadata;
if (!width || !pageHeight || !pages || !delay || !channels) throw new Error('Expected a multi-frame GIF with timing metadata.');
if (!delay.every((duration) => duration === delay[0])) throw new Error('Variable-frame timing needs a different encoder workflow.');
const frameSize = width * pageHeight * channels;
const encoder = spawn(ffmpeg, ['-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-r', String(1000 / delay[0]), '-i', 'pipe:0', '-c:v', 'libvpx-vp9', '-b:v', '420k', '-pix_fmt', 'yuv420p', '-an', output], { stdio: ['pipe', 'ignore', 'inherit'] });
const done = once(encoder, 'close');
for (let index = 0; index < pages; index++) {
  const frame = raw.subarray(index * frameSize, (index + 1) * frameSize);
  const jpeg = await sharp(frame, { raw: { width, height: pageHeight, channels } }).jpeg({ quality: 88 }).toBuffer();
  if (!encoder.stdin.write(jpeg)) await once(encoder.stdin, 'drain');
  if (index === 0) await sharp(frame, { raw: { width, height: pageHeight, channels } }).webp({ quality: 90 }).toFile(new URL('../public/projects/nexus-poster.webp', import.meta.url).pathname);
}
encoder.stdin.end();
const [code] = await done;
if (code !== 0) throw new Error(`FFmpeg exited with ${code}`);
console.log(`Converted ${pages} original frames at ${1000 / delay[0]}fps to ${output}`);
