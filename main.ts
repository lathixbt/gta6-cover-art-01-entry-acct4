import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-app.ts';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const deliveryRoot = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(deliveryRoot, { recursive: true });
for (const folder of ['app', 'screenshots']) {
  cpSync(join(projectRoot, folder), join(deliveryRoot, folder), { recursive: true });
}

const packageSummary = buildDossier(deliveryRoot, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});
writeFileSync(join(deliveryRoot, 'dossier.json'), packageSummary);
