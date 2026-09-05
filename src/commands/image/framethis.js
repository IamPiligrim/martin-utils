const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');

const FRAME_PATH = path.join(__dirname, '../../media/frame.png');

// Scan from center outward to find where the opaque frame border begins —
// the inner transparent area lies between those borders.
function findInnerBounds(data, width, height) {
  const alpha = (x, y) => data[(y * width + x) * 4 + 3];
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);

  let left = 0;
  for (let x = cx; x >= 0; x--) {
    if (alpha(x, cy) >= 128) { left = x + 1; break; }
  }

  let right = width - 1;
  for (let x = cx; x < width; x++) {
    if (alpha(x, cy) >= 128) { right = x - 1; break; }
  }

  let top = 0;
  for (let y = cy; y >= 0; y--) {
    if (alpha(cx, y) >= 128) { top = y + 1; break; }
  }

  let bottom = height - 1;
  for (let y = cy; y < height; y++) {
    if (alpha(cx, y) >= 128) { bottom = y - 1; break; }
  }

  return { left, right, top, bottom };
}

// Loaded once on first use and cached
let frameMeta = null;

async function getFrameMeta() {
  if (frameMeta) return frameMeta;

  const frame = await loadImage(FRAME_PATH);
  const tmp = createCanvas(frame.width, frame.height);
  const tmpCtx = tmp.getContext('2d');
  tmpCtx.drawImage(frame, 0, 0);
  const { data } = tmpCtx.getImageData(0, 0, frame.width, frame.height);

  const bounds = findInnerBounds(data, frame.width, frame.height);
  frameMeta = { frame, bounds, width: frame.width, height: frame.height };
  return frameMeta;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('framethis')
    .setDescription('Вставляет ваше изображение в золотую рамку')
    .addAttachmentOption(opt =>
      opt.setName('image')
        .setDescription('Изображение для вставки в рамку')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const attachment = interaction.options.getAttachment('image');

    if (!attachment.contentType?.startsWith('image/')) {
      return interaction.editReply({ content: 'Прикрепи изображение (PNG, JPG, WebP).', ephemeral: true });
    }

    const { frame, bounds, width, height } = await getFrameMeta();

    const response = await fetch(attachment.url);
    const buffer = Buffer.from(await response.arrayBuffer());
    const userImage = await loadImage(buffer);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const innerW = bounds.right - bounds.left;
    const innerH = bounds.bottom - bounds.top;

    // Stretch independently on each axis so the image fills the inner area exactly
    ctx.drawImage(userImage, bounds.left, bounds.top, innerW, innerH);

    // Frame on top — transparent inner area lets the image show through
    ctx.drawImage(frame, 0, 0);

    const result = await canvas.encode('png');
    const file = new AttachmentBuilder(result, { name: 'framed.png' });

    await interaction.editReply({ files: [file] });
  },
};