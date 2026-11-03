// Turns the raw files in /assets-source into web-ready images in /public.
// Run with `npm run assets` whenever a source image is added or replaced.
import sharp from 'sharp';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-source';
const OUT = 'public';

await mkdir(`${OUT}/images/brand`, { recursive: true });
await mkdir(`${OUT}/images/projects/elvtr`, { recursive: true });

/**
 * The logo files ship on an opaque white field. To place them on ivory or
 * dark surfaces we derive alpha from luminance (white -> transparent) and
 * keep a single ink colour. The letterforms themselves are untouched.
 */
async function transparentLogo(file, outName, ink, width) {
  const { data, info } = await sharp(`${SRC}/brand/${file}`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    const alpha = Math.max(0, Math.min(255, ((255 - lum) / (255 - 95)) * 255));
    data[i] = ink[0];
    data[i + 1] = ink[1];
    data[i + 2] = ink[2];
    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  const img = sharp(data, { raw: info }).trim({ threshold: 1 });
  const buf = await img.png().toBuffer();
  await sharp(buf).resize({ width }).png({ compressionLevel: 9 }).toFile(`${OUT}/images/brand/${outName}.png`);
  return buf;
}

const ink = [99, 93, 86]; // #635D56 charcoal brown
await transparentLogo('logo-eh-script.png', 'logo-eh-script', ink, 900);
const circle = await transparentLogo('logo-eh-circle.webp', 'logo-eh-circle', ink, 400);
await sharp(circle).resize(64, 64).png().toFile(`${OUT}/favicon.png`);
await sharp(circle).resize(180, 180, { background: '#F8F2E8', fit: 'contain' }).flatten({ background: '#F8F2E8' }).png().toFile(`${OUT}/apple-touch-icon.png`);

// Headshots
for (const w of [640, 1000, 1400]) {
  await sharp(`${SRC}/brand/headshot-black-suit.webp`).resize({ width: w }).webp({ quality: 82 }).toFile(`${OUT}/images/brand/headshot-suit-${w}.webp`);
}

// About-page portrait (full-resolution original, 1125×2000)
for (const w of [720, 1125]) {
  await sharp(`${SRC}/brand/headshot-laptop.webp`).resize({ width: w }).webp({ quality: 84 }).toFile(`${OUT}/images/brand/headshot-laptop-${w}.webp`);
}

// ELVTR / Minecraft Dungeons case study imagery
const slug = (f) => f.replace(/\.png$/, '').replace(/\(|\)/g, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '').toLowerCase();
for (const f of await readdir(`${SRC}/elvtr`)) {
  if (!f.endsWith('.png')) continue;
  const src = path.join(SRC, 'elvtr', f);
  await sharp(src).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/images/projects/elvtr/${slug(f)}.webp`);
  // Research boards are dense; a larger copy lets the lightbox zoom into the detail.
  if (f.startsWith('Assignment')) {
    await sharp(src).resize({ width: 3200, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${OUT}/images/projects/elvtr/${slug(f)}-lg.webp`);
  }
}

// Fortnite case study. Mockups and the style guide get a large copy for the lightbox.
// Colour-vision screenshots go in assets-source/fortnite/accessibility/ named by
// condition (e.g. protanomaly.png); they're picked up automatically.
await mkdir(`${OUT}/images/projects/fortnite/accessibility`, { recursive: true });
for (const f of (await readdir(`${SRC}/fortnite`)).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const src = path.join(SRC, 'fortnite', f);
  const name = f.replace(/\.(jpe?g|png)$/i, '');
  await sharp(src).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${OUT}/images/projects/fortnite/${name}.webp`);
  if (!name.includes('reference')) {
    await sharp(src).resize({ width: 3200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/images/projects/fortnite/${name}-lg.webp`);
  }
}
for (const f of (await readdir(`${SRC}/fortnite/accessibility`)).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  await sharp(path.join(SRC, 'fortnite', 'accessibility', f))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${OUT}/images/projects/fortnite/accessibility/${f.replace(/\.(jpe?g|png)$/i, '')}.webp`);
}

// Answer Campus. The Figma board is shown whole (zoomable) and as individual
// screens cropped straight from it, so the designs themselves are untouched.
{
  const AC = `${SRC}/answer-campus`;
  const OUTAC = `${OUT}/images/projects/answer-campus`;
  await mkdir(OUTAC, { recursive: true });
  const board = `${AC}/answer-campus-app-layout-mockup.png`;
  await sharp(board).resize({ width: 2400 }).webp({ quality: 85 }).toFile(`${OUTAC}/board.webp`);
  await sharp(board).resize({ width: 5000 }).webp({ quality: 82 }).toFile(`${OUTAC}/board-lg.webp`);

  // Crop boxes measured on a 2000px-wide copy of the board, scaled up here.
  const meta = await sharp(board).metadata();
  const k = meta.width / 2000;
  const screens = {
    'screen-friends': [580, 380, 705, 645],
    'screen-conversation': [996, 683, 1121, 948],
    'screen-responses': [1139, 683, 1264, 948],
    'screen-reactions': [1271, 683, 1396, 948],
    'screen-agenda': [1650, 380, 1775, 645],
    'screen-navigation': [103, 345, 240, 518],
  };
  for (const [name, [x1, y1, x2, y2]] of Object.entries(screens)) {
    await sharp(board)
      .extract({ left: Math.round(x1 * k), top: Math.round(y1 * k), width: Math.round((x2 - x1) * k), height: Math.round((y2 - y1) * k) })
      .webp({ quality: 90 })
      .toFile(`${OUTAC}/${name}.webp`);
  }

  // In-game stills (full 3456×2160 frames), cropped to the phone panel.
  for (const name of ['game-friends', 'game-reactions', 'game-agenda']) {
    await sharp(`${AC}/stills/${name}.png`)
      .extract({ left: 1040, top: 470, width: 1380, height: 1200 })
      .resize({ width: 900 })
      .webp({ quality: 85 })
      .toFile(`${OUTAC}/${name}.webp`);
  }
  // Video posters (first frame of each clip).
  for (const f of (await readdir(`${AC}/stills`)).filter((f) => f.endsWith('-poster.png'))) {
    await sharp(`${AC}/stills/${f}`).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUTAC}/${f.replace('.png', '.webp')}`);
  }
  // Clips were trimmed/encoded from the original screen recordings with ffmpeg
  // (see docs/PLAN.md); they're copied as-is.
  await mkdir(`${OUT}/videos/answer-campus`, { recursive: true });
  for (const f of await readdir(`${AC}/video`)) {
    await copyFile(`${AC}/video/${f}`, `${OUT}/videos/answer-campus/${f}`);
  }
}

// Tiny Tempo. Same approach as Answer Campus: the team's Figma board is shown
// whole and as individual screens cropped from it; the SAS architecture
// diagram is used exactly as it appears in the document.
{
  const TT = `${SRC}/tiny-tempo`;
  const OUTTT = `${OUT}/images/projects/tiny-tempo`;
  await mkdir(OUTTT, { recursive: true });
  const board = `${TT}/board.png`;
  await sharp(board).resize({ width: 2400 }).webp({ quality: 85 }).toFile(`${OUTTT}/board.webp`);
  await sharp(board).webp({ quality: 85 }).toFile(`${OUTTT}/board-lg.webp`);
  await sharp(`${TT}/system-architecture.png`).webp({ quality: 90 }).toFile(`${OUTTT}/system-architecture.webp`);
  await sharp(`${TT}/system-architecture.png`).webp({ quality: 90 }).toFile(`${OUTTT}/system-architecture-lg.webp`);

  // Crop boxes measured on a 2000px-wide copy of the board, scaled up here.
  const meta = await sharp(board).metadata();
  const k = meta.width / 2000;
  const screens = {
    'screen-login': [1, 14, 183, 430],
    'screen-pairing': [200, 110, 382, 545],
    'screen-device-status': [1196, 9, 1378, 430],
    'screen-dashboard': [399, 9, 581, 460],
    'screen-wellness-insight': [399, 455, 581, 786],
    'screen-specialists': [598, 9, 780, 420],
    'screen-messaging': [796, 9, 978, 505],
    'screen-labor-alert': [996, 9, 1178, 500],
    'screen-patient-directory': [1395, 9, 1577, 470],
    'screen-patient-detail': [1605, 9, 1787, 520],
    'screen-device-approval': [1804, 430, 1986, 880],
  };
  for (const [name, [x1, y1, x2, y2]] of Object.entries(screens)) {
    await sharp(board)
      .extract({ left: Math.round(x1 * k), top: Math.round(y1 * k), width: Math.round((x2 - x1) * k), height: Math.round((y2 - y1) * k) })
      .webp({ quality: 90 })
      .toFile(`${OUTTT}/${name}.webp`);
  }
  for (const f of (await readdir(`${TT}/stills`)).filter((f) => f.endsWith('-poster.png'))) {
    await sharp(`${TT}/stills/${f}`).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUTTT}/${f.replace('.png', '.webp')}`);
  }
  // Preview and full prototype were cut from the team's recording with ffmpeg
  // (see docs/PLAN.md); they're copied as-is.
  await mkdir(`${OUT}/videos/tiny-tempo`, { recursive: true });
  for (const f of await readdir(`${TT}/video`)) {
    await copyFile(`${TT}/video/${f}`, `${OUT}/videos/tiny-tempo/${f}`);
  }
}

// Tipping, Reimagined. Iteration panels are cropped from Ella's process board
// (stills/iter-*), interface stills from her prototype recording and her
// original 2024 coded version (see docs/PLAN.md for timestamps).
{
  const T = `${SRC}/tipping`;
  const OUTT = `${OUT}/images/projects/tipping`;
  await mkdir(OUTT, { recursive: true });
  for (const f of await readdir(`${T}/stills`)) {
    const name = f.replace('.png', '').replace('.', '-');
    await sharp(`${T}/stills/${f}`).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`${OUTT}/${name}.webp`);
  }
  await mkdir(`${OUT}/videos/tipping`, { recursive: true });
  for (const f of await readdir(`${T}/video`)) {
    await copyFile(`${T}/video/${f}`, `${OUT}/videos/tipping/${f}`);
  }
}

// Dance page. Videos were re-encoded from the camera originals at 1280px with
// the (silent) audio removed; photos are auto-rotated from their EXIF data.
// dance-08 was an iPhone HEIC, converted to PNG with the Windows codec.
{
  const DS = `${SRC}/dance`;
  const OUTD = `${OUT}/images/dance`;
  await mkdir(OUTD, { recursive: true });
  for (const f of await readdir(`${DS}/photos`)) {
    const name = f.replace(/\.(jpg|png)$/i, '');
    await sharp(`${DS}/photos/${f}`).rotate().resize({ width: 900, height: 900, fit: 'inside' }).webp({ quality: 82 }).toFile(`${OUTD}/${name}.webp`);
    await sharp(`${DS}/photos/${f}`).rotate().resize({ width: 2000, height: 2000, fit: 'inside' }).webp({ quality: 82 }).toFile(`${OUTD}/${name}-lg.webp`);
  }
  for (const f of await readdir(`${DS}/stills`)) {
    await sharp(`${DS}/stills/${f}`).webp({ quality: 80 }).toFile(`${OUTD}/${f.replace('.png', '.webp')}`);
  }
  await mkdir(`${OUT}/videos/dance`, { recursive: true });
  for (const f of await readdir(`${DS}/video`)) {
    await copyFile(`${DS}/video/${f}`, `${OUT}/videos/dance/${f}`);
  }
}

// Game icons and covers for the desktop's Games folder. Icons are 32×32 pixel
// art, scaled up 4× with nearest-neighbour so every pixel stays sharp.
{
  const G = `${SRC}/games`;
  const OUTG = `${OUT}/images/games`;
  await mkdir(OUTG, { recursive: true });
  for (const f of await readdir(G)) {
    const name = f.replace('.png', '');
    if (name.endsWith('-icon')) {
      await sharp(`${G}/${f}`).resize({ width: 128, kernel: 'nearest' }).png().toFile(`${OUTG}/${name}.png`);
    } else {
      await sharp(`${G}/${f}`).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`${OUTG}/${name}.webp`);
    }
  }
}

// Work-page desktop. The pixel-art wallpaper keeps its full resolution (a
// smaller copy for phones); certificate images are rendered from page 1 of the
// original PDFs (see docs/PLAN.md). The PDFs and resume are copied unchanged.
{
  const D = `${SRC}/desktop`;
  const OUTD = `${OUT}/images/desktop`;
  await mkdir(`${OUTD}/certifications`, { recursive: true });
  const wall = `${D}/umiami-pixel-wallpaper.png`;
  await sharp(wall).webp({ quality: 90, smartSubsample: true }).toFile(`${OUTD}/umiami-pixel-wallpaper.webp`);
  await sharp(wall).resize({ width: 1344, kernel: 'nearest' }).webp({ quality: 90 }).toFile(`${OUTD}/umiami-pixel-wallpaper-sm.webp`);

  await mkdir(`${OUT}/certifications`, { recursive: true });
  for (const f of (await readdir(`${D}/certifications`)).filter((f) => f.endsWith('.pdf'))) {
    const name = f.replace('.pdf', '');
    await copyFile(`${D}/certifications/${f}`, `${OUT}/certifications/${f}`);
    await sharp(`${D}/certifications/${name}.png`).resize({ width: 1800 }).webp({ quality: 88 }).toFile(`${OUTD}/certifications/${name}.webp`);
    await sharp(`${D}/certifications/${name}.png`).resize({ width: 480 }).webp({ quality: 85 }).toFile(`${OUTD}/certifications/${name}-thumb.webp`);
  }
  await mkdir(`${OUT}/resume`, { recursive: true });
  await copyFile(`${D}/resume/Ella-Hartsell-Resume.pdf`, `${OUT}/resume/Ella-Hartsell-Resume.pdf`);
}

// Project preview videos are served as-is (already web-sized MP4s).
await mkdir(`${OUT}/videos`, { recursive: true });
const videos = { elvtr: 'minecraft-dungeons-preview.mp4', fortnite: 'fortnite-preview.mp4' };
for (const [dir, out] of Object.entries(videos)) {
  for (const f of (await readdir(`${SRC}/${dir}`)).filter((f) => f.endsWith('.mp4'))) {
    await copyFile(path.join(SRC, dir, f), `${OUT}/videos/${out}`);
  }
}

console.log('Assets prepared.');
