const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');

const LEFT_PATH = path.join(__dirname, '../../media/omglook/left.png');
const RIGHT_PATH = path.join(__dirname, '../../media/omglook/right.png');

// The meme is drawn small, as if it were far away between the two characters
const MEME_MAX_SIZE = 380;
const MEME_PADDING = 40;
// Vertical position of the meme's center (fraction of height), roughly at eye/pointing-hand level
const MEME_CENTER_Y = 0.4;

// Loaded once on first use and cached
let sides = null;

async function getSides() {
  if (sides) return sides;
  const [left, right] = await Promise.all([loadImage(LEFT_PATH), loadImage(RIGHT_PATH)]);
  sides = { left, right };
  return sides;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('omglook')
    .setDescription('Вставляет ваше изображение между двумя удивлёнными парнями')
    .addAttachmentOption(opt =>
      opt.setName('image')
        .setDescription('Изображение для вставки между парнями')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const attachment = interaction.options.getAttachment('image');

    if (!attachment.contentType?.startsWith('image/')) {
      return interaction.editReply({ content: 'Прикрепи изображение (PNG, JPG, WebP).', ephemeral: true });
    }

    const { left, right } = await getSides();

    const response = await fetch(attachment.url);
    const buffer = Buffer.from(await response.arrayBuffer());
    const userImage = await loadImage(buffer);

    const height = Math.max(left.height, right.height);

    // Shrink the meme into a small box, keeping its aspect ratio
    const scale = Math.min(MEME_MAX_SIZE / userImage.width, MEME_MAX_SIZE / userImage.height);
    const memeW = Math.round(userImage.width * scale);
    const memeH = Math.round(userImage.height * scale);

    const gap = memeW + MEME_PADDING * 2;
    const width = left.width + gap + right.width;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // White background fills transparent and unused areas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(left, 0, height - left.height);
    ctx.drawImage(userImage, left.width + MEME_PADDING, Math.round(height * MEME_CENTER_Y - memeH / 2), memeW, memeH);
    ctx.drawImage(right, left.width + gap, height - right.height);

    const result = await canvas.encode('png');
    const file = new AttachmentBuilder(result, { name: 'omglook.png' });

    await interaction.editReply({ files: [file] });
  },
};
