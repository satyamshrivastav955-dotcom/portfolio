import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Converts the user-supplied conceptual cover artwork in Crazy/ (img1–img8.png,
// generated separately per docs/project-artwork-briefs.md) into optimized WebP
// covers. Mapping follows the brief order 01–08.
const coversDir = fileURLToPath(new URL('../public/projects/covers/', import.meta.url));
await mkdir(coversDir, { recursive: true });

const covers = [
  ['img1', 'argus'],
  ['img2', 'callshield'],
  ['img3', 'graphql-sentinel'],
  ['img4', 'hybrid-ai-nids'],
  ['img5', 'nexus-1'],
  ['img6', 'face-blockchain'],
  ['img7', 'taskorbit'],
  ['img8', 'student-intelligence'],
];

for (const [input, id] of covers) {
  const result = await sharp(fileURLToPath(new URL(`../Crazy/${input}.png`, import.meta.url)))
    .webp({ quality: 82 })
    .toFile(join(coversDir, `${id}.webp`));
  console.log(`${id}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)}KB`);
}
