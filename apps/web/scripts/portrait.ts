/**
 * Gera o retrato em ASCII a partir de scripts/assets/lucas-ferreira.jpg
 * (foto do GitHub, https://avatars.githubusercontent.com/u/26325904?v=4, em preto e branco):
 *   - src/lib/portrait.ts            → texto usado no hero (variantes para tema escuro e claro)
 *   - public/og.png                  → imagem de compartilhamento (1200×630)
 *   - public/icon-512.png, apple-touch-icon.png, favicon.png, favicon.ico
 *
 * Rode com `bun run portrait` (em apps/web). Os glifos são desenhados como paths SVG
 * a partir das próprias fontes do site (Geist Mono e Doto), sem depender de fontes do sistema.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import opentype from "opentype.js";
import sharp, { type Sharp } from "sharp";
import { decompress } from "wawoff2";

const root = fileURLToPath(new URL("..", import.meta.url));
const at = (path: string) => `${root}${path}`;

const SOURCE = at("scripts/assets/lucas-ferreira.jpg");
/** Geist Mono: avanço de 600/1000 em, então uma célula com line-height 1 tem proporção 0.6. */
const CELL_RATIO = 0.6;

/* ───────────────────────── imagem → grade ───────────────────────── */

type Gray = { data: Uint8Array; width: number; height: number };

async function toGray(image: Sharp): Promise<Gray> {
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  return { data: new Uint8Array(data), width: info.width, height: info.height };
}

/** Versão suavizada, só para separar o fundo (ruído atrapalha o flood fill). */
const loadMaskSource = () => toGray(sharp(SOURCE).grayscale().blur(1.2));

/**
 * Contraste global suave. Equalização local e nitidez agressiva transformam textura
 * de pele em ruído quando cada amostra vira um caractere.
 */
const loadToneSource = () =>
  toGray(
    sharp(SOURCE)
      .grayscale()
      .normalize({ lower: 1, upper: 99 }),
  );

/** Fecha pequenas incisões do recorte, sem apagar detalhes dentro da silhueta. */
function closeSubjectMask(mask: Uint8Array, width: number, height: number) {
  const radius = Math.max(1, Math.round(Math.min(width, height) * 0.015));
  const subject = mask.map((value) => 1 - value);
  const morph = (input: Uint8Array, expand: boolean) => {
    const horizontal = new Uint8Array(input.length);
    const output = new Uint8Array(input.length);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let value = expand ? 0 : 1;
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = Math.max(0, Math.min(width - 1, x + dx));
          const neighbor = input[y * width + nx] ?? 0;
          value = expand ? Math.max(value, neighbor) : Math.min(value, neighbor);
        }
        horizontal[y * width + x] = value;
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let value = expand ? 0 : 1;
        for (let dy = -radius; dy <= radius; dy++) {
          const ny = Math.max(0, Math.min(height - 1, y + dy));
          const neighbor = horizontal[ny * width + x] ?? 0;
          value = expand ? Math.max(value, neighbor) : Math.min(value, neighbor);
        }
        output[y * width + x] = value;
      }
    }
    return output;
  };
  return morph(morph(subject, true), false).map((value) => 1 - value);
}

/**
 * Remove o fundo cinza liso: flood fill a partir das bordas. Só avança para vizinhos
 * próximos da cor do fundo E sem salto brusco de brilho, para não vazar pelo rosto.
 */
function backgroundMask({ data, width, height }: Gray) {
  const top = Array.from(data.subarray(0, width * 8)).sort((a, b) => a - b);
  const bg = top[Math.floor(top.length / 2)] ?? 128;
  const tolerance = 26;
  const step = 3;
  const mask = new Uint8Array(width * height); // 1 = fundo
  const stack: number[] = [];
  const visit = (i: number, from: number) => {
    const v = data[i] ?? 0;
    if (mask[i] || Math.abs(v - bg) > tolerance) return;
    if (from >= 0 && Math.abs(v - (data[from] ?? 0)) > step) return;
    mask[i] = 1;
    stack.push(i);
  };
  for (let x = 0; x < width; x++) {
    visit(x, -1);
    visit((height - 1) * width + x, -1);
  }
  for (let y = 0; y < height; y++) {
    visit(y * width, -1);
    visit(y * width + width - 1, -1);
  }
  while (stack.length) {
    const i = stack.pop() as number;
    const x = i % width;
    if (x > 0) visit(i - 1, i);
    if (x < width - 1) visit(i + 1, i);
    if (i >= width) visit(i - width, i);
    if (i < width * (height - 1)) visit(i + width, i);
  }
  // O fundo e algumas bordas da pele têm tons parecidos; o fechamento recupera
  // trechos estreitos das bochechas que o flood fill confundiu com o fundo.
  return closeSubjectMask(mask, width, height);
}

type Crop = { left: number; top: number; width: number; height: number };

/* ───────────────────────── fontes → paths ───────────────────────── */

async function loadFont(pkg: string, file: string) {
  const woff2 = await readFile(at(`node_modules/@fontsource-variable/${pkg}/files/${file}`));
  const ttf = await decompress(woff2);
  return opentype.parse(ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength) as ArrayBuffer);
}

const mono = await loadFont("geist-mono", "geist-mono-latin-wght-normal.woff2");
const display = await loadFont("doto", "doto-latin-wght-normal.woff2");
// Mesmo peso do <pre>: traços mais firmes sobrevivem às células pequenas do hero.
const monoRender = { kerning: false, hinting: false, variation: { wght: 600 } };

function svg(width: number, height: number, body: string, background = "#000") {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${background}"/>${body}</svg>`,
  );
}

/* ───────────────────────── imagem → caracteres (por densidade) ───────────────────────── */

/**
 * Mede a cobertura real de cada glifo na Geist Mono. A ordem e a distância entre
 * caracteres vêm da fonte; uma rampa presumida perde tons ou cria degraus no rosto.
 * A paleta completa oferece meios-tons intermediários, evitando grandes manchas
 * formadas pela troca brusca entre poucos caracteres, como X e #.
 */
const CHARSET = Array.from({ length: 95 }, (_, index) => String.fromCharCode(32 + index));

async function glyphDensities() {
  const size = 60;
  const width = size * CELL_RATIO;
  const samples = await Promise.all(
    CHARSET.map(async (char) => {
      const d = char === " " ? "" : mono.charToGlyph(char).getPath(0, size * 0.8, size, monoRender, mono).toPathData(2);
      const { data } = await sharp(svg(width, size, `<path fill="#fff" d="${d}"/>`))
        .grayscale()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const coverage = data.reduce((sum, value) => sum + value / 255, 0) / data.length;
      return { char, density: coverage };
    }),
  );
  const densest = Math.max(...samples.map((sample) => sample.density)) || 1;
  return samples
    .map(({ char, density }) => ({ char, density: density / densest }))
    .sort((a, b) => a.density - b.density);
}

const glyphs = await glyphDensities();

/** Suavização bilateral: reduz ruído nos meios-tons sem borrar olhos, boca e silhueta. */
function softenTones(pixels: Uint8Array, width: number, height: number) {
  const tones = new Float64Array(pixels.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const center = (pixels[y * width + x] ?? 0) / 255;
      let sum = 0;
      let weights = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const tone = (pixels[ny * width + nx] ?? 0) / 255;
          const weight = Math.exp(-(dx * dx + dy * dy) / (2 * 1.1 ** 2) - (tone - center) ** 2 / (2 * 0.08 ** 2));
          sum += tone * weight;
          weights += weight;
        }
      }
      tones[y * width + x] = sum / weights;
    }
  }
  return tones;
}

/** Reamostra a foto na proporção das células e quantiza o brilho para a fonte real. */
async function sample(
  gray: Gray,
  mask: Uint8Array,
  crop: Crop,
  cols: number,
  { invert = false, gamma = 1.05 }: { invert?: boolean; gamma?: number } = {},
) {
  const cellW = crop.width / cols;
  const rows = Math.round(crop.height / (cellW / CELL_RATIO));
  // Mascara antes de reamostrar: a borda da silhueta recebe antialiasing e não vaza cinza.
  // Preto no tema escuro e branco no claro também podem ser espaços dentro do sujeito.
  const input = Buffer.from(gray.data.map((value, i) => mask[i] ? 0 : invert ? 255 - value : value));
  const { data } = await sharp(input, { raw: { width: gray.width, height: gray.height, channels: 1 } })
    .extract(crop)
    .resize(cols, rows, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const tones = Float64Array.from(softenTones(data, cols, rows), (tone) => tone ** gamma);
  const errors = new Float64Array(tones.length);
  const lines = Array.from({ length: rows }, () => Array<string>(cols).fill(" "));
  const diffusion = [[1, 0, 7 / 16], [-1, 1, 3 / 16], [0, 1, 5 / 16], [1, 1, 1 / 16]] as const;
  for (let row = 0; row < rows; row++) {
    const direction = row % 2 ? -1 : 1;
    for (let step = 0; step < cols; step++) {
      const col = direction === 1 ? step : cols - 1 - step;
      const index = row * cols + col;
      const value = tones[index] ?? 0;
      const target = Math.max(0, Math.min(1, value + (errors[index] ?? 0)));
      let best = glyphs[0]!;
      for (const glyph of glyphs) {
        if (Math.abs(glyph.density - target) < Math.abs(best.density - target)) best = glyph;
      }
      lines[row]![col] = best.char;
      if (value < 0.02) continue;

      // Distribui a pequena diferença tonal entre vizinhos, em vez de criar faixas.
      // Alterna a direção por linha para não desenhar listras, mantendo o fundo vazio.
      const error = (target - best.density) * 0.95;
      for (const [dx, dy, weight] of diffusion) {
        const nx = col + dx * direction;
        const ny = row + dy;
        if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
        const neighbor = ny * cols + nx;
        if ((tones[neighbor] ?? 0) < 0.02) continue;
        errors[neighbor] = (errors[neighbor] ?? 0) + error * weight;
      }
    }
  }
  return { rows, art: lines.map((line) => line.join("").trimEnd()).join("\n") };
}

/** Desenha o ASCII como paths SVG, um <path> por linha (o librsvg recusa atributos gigantes). */
function asciiPaths(art: string, x: number, y: number, fontSize: number, fill = "#fff") {
  // Coordenadas inteiras na fonte; a escala fica no SVG para evitar glifos quebrados
  // pelo arredondamento dos paths em tamanhos pequenos ou fracionários.
  const master = 100;
  const paths = art
    .split("\n")
    .map((line, r) => {
      // Glifo a glifo, avanço fixo: sem ligaduras/kerning trocando caracteres.
      const d = Array.from(line)
        .map((char, c) =>
          char === " "
            ? ""
            : mono.charToGlyph(char).getPath(c * master * CELL_RATIO, r * master + master * 0.8, master, monoRender, mono).toPathData(2),
        )
        .join(" ");
      return d ? `<path fill="${fill}" d="${d}"/>` : "";
    })
    .join("");
  return `<g transform="translate(${x} ${y}) scale(${fontSize / master})">${paths}</g>`;
}

/* ───────────────────────── execução ───────────────────────── */

const mask = backgroundMask(await loadMaskSource());
const gray = await loadToneSource();
if (process.env.DEBUG_MASK) {
  await sharp(Buffer.from(mask.map((m) => (m ? 0 : 255))), { raw: { width: gray.width, height: gray.height, channels: 1 } })
    .png()
    .toFile(process.env.DEBUG_MASK);
}
// Dedica mais células ao rosto e menos ao peito, preservando cabelo e ombros.
const side = Math.round(Math.min(gray.width, gray.height) * 0.825);
const heroCrop: Crop = { left: Math.round((gray.width - side) / 2), top: 0, width: side, height: side };
const HERO_COLS = 128;
const heroGrid = await sample(gray, mask, heroCrop, HERO_COLS);
const dark = heroGrid.art;
const light = (await sample(gray, mask, heroCrop, HERO_COLS, { invert: true, gamma: 0.95 })).art;

await Promise.all([
  writeFile(at("public/portrait.txt"), `${dark}\n`),
  writeFile(at("public/portrait-light.txt"), `${light}\n`),
]);

await writeFile(
  at("src/lib/portrait.ts"),
  `// Gerado por scripts/portrait.ts a partir de scripts/assets/lucas-ferreira.jpg. Não edite à mão.
export const portrait = {
  cols: ${HERO_COLS},
  rows: ${heroGrid.rows},
  /** Caracteres claros sobre fundo preto. */
  dark: ${JSON.stringify(dark)},
  /** Inversão para o tema claro (tinta preta sobre branco). */
  light: ${JSON.stringify(light)},
} as const;
`,
);

// OG 1200×630: retrato à direita, nome em Doto à esquerda.
{
  const W = 1200;
  const H = 630;
  const fontSize = H / heroGrid.rows; // retrato ocupa a altura toda
  const artWidth = HERO_COLS * fontSize * CELL_RATIO;
  const artX = W - artWidth - 24;
  const art = asciiPaths(dark, artX, 0, fontSize);
  const name = ["LUCAS", "FERREIRA"]
    .map((word, i) => display.getPath(word, 64, 300 + i * 116, 128).toPathData(2))
    .join("");
  const meta = mono.getPath("luccasfr.dev", 68, 560, 28).toPathData(2);
  const body = `${art}<path fill="#fff" d="${name}"/><path fill="#fff" fill-opacity="0.62" d="${meta}"/>`;
  await sharp(svg(W, H, body)).png({ compressionLevel: 9 }).toFile(at("public/og.png"));
}

// Ícones: só o rosto, com menos colunas para os glifos sobreviverem à redução.
{
  const faceCrop: Crop = { left: 112, top: 14, width: 244, height: 330 };
  const faceGrid = await sample(gray, mask, faceCrop, 22);
  const face = faceGrid.art;
  const S = 512;
  const fontSize = S / Math.max(faceGrid.rows, 22 * CELL_RATIO);
  const artWidth = 22 * fontSize * CELL_RATIO;
  const art = asciiPaths(face, (S - artWidth) / 2, (S - faceGrid.rows * fontSize) / 2, fontSize);
  const icon = await sharp(svg(S, S, art)).png().toBuffer();

  await writeFile(at("public/icon-512.png"), icon);
  await sharp(icon).resize(180, 180).png().toFile(at("public/apple-touch-icon.png"));
  await sharp(icon).resize(48, 48).png().toFile(at("public/favicon.png"));

  // favicon.ico com PNGs embutidos (16, 32, 48).
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((size) => sharp(icon).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(pngs[i]?.length ?? 0, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += pngs[i]?.length ?? 0;
  });
  await writeFile(at("public/favicon.ico"), Buffer.concat([header, ...pngs]));
}

console.log(`retrato ${HERO_COLS}×${heroGrid.rows} gerado; og.png e ícones atualizados.`);
