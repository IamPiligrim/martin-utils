const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gaymetr')
    .setDescription('Измеряет уровень гейности')
    .addUserOption(opt =>
      opt.setName('user')
        .setDescription('Кого измерить (по умолчанию — вы)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('user') ?? interaction.user;
    const percent = Math.floor(Math.random() * 101) + 1;
    await interaction.reply(`${target} is ${percent}% gay`);
  },
};
