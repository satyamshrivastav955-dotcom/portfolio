import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const publicDir = new URL('../public/', import.meta.url);
const projectDir = new URL('projects/', publicDir);
await mkdir(projectDir, { recursive: true });

await sharp(new URL('og-image.svg', publicDir).pathname).png().toFile(new URL('og-image.png', publicDir).pathname);
await sharp(new URL('icon.svg', publicDir).pathname).resize(180, 180).png().toFile(new URL('apple-touch-icon.png', publicDir).pathname);

const assets = [
  ['nexus-execution', 'https://media.githubusercontent.com/media/satyamshrivastav955-dotcom/language-to-action-robot-agent/main/outputs/demo_strip.png'],
  ['taskorbit-dashboard', 'https://raw.githubusercontent.com/satyamshrivastav955-dotcom/taskorbit/main/docs/assets/taskorbit-dashboard.png'],
  ['callshield-insight', 'https://raw.githubusercontent.com/satyamshrivastav955-dotcom/call-shield/main/assets/screenshots/antai_incall_insight.jpg'],
  ['provenance-terminal', 'https://raw.githubusercontent.com/satyamshrivastav955-dotcom/face-blockchain-verification/main/assets/demo_confirmed_match.png'],
  ['student-shap', 'https://raw.githubusercontent.com/satyamshrivastav955-dotcom/student-performance-prediction-system/main/assets/figures/12_shap_global_importance.png'],
];

for (const [name, url] of assets) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  let image = sharp(Buffer.from(await response.arrayBuffer()));
  if (name === 'provenance-terminal') image = image.extract({ left: 133, top: 327, width: 500, height: 177 });
  if (name === 'student-shap') image = image.resize({ width: 1200, withoutEnlargement: true });
  const result = await image.webp({ quality: 88 }).toFile(new URL(`${name}.webp`, projectDir).pathname);
  console.log(`${name}: ${result.width}×${result.height}, ${result.size} bytes`);
}
