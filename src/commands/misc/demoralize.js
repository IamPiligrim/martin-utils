const { SlashCommandBuilder } = require('discord.js');

const FACTS = [
  'Statistically, most of your childhood friends are now more successful than you.',
  'The average person forgets 90% of what they learned in school within a year — including everything you\'re proud of knowing.',
  'You will probably die from either heart disease or cancer, and there is nothing you can do to fully prevent it.',
  'Nearly half of your paycheck disappears into taxes, fees, and inflation before you ever really "have" it.',
  'By the time most people reach your age, they\'ve already given up on most of their childhood dreams — and so will you.',
  'The universe will experience heat death, and every single thing you\'ve ever done will be erased without a trace.',
  'You are, on average, one of about 8 billion people — statistically, nothing about you is special.',
  'Most relationships end. The odds are not in favor of "happily ever after."',
  'Your body has already started aging in ways you can\'t reverse, no matter how healthy you try to be.',
  'Most people rate themselves as above-average — mathematically, that means most people are wrong about themselves.',
  'The skills you spent years mastering may be automated or irrelevant within a decade.',
  'On your deathbed, most of what you worried about today will not have mattered at all.',
  'You will be forgotten within a few generations, just like almost everyone else who has ever lived.',
  'The people who seem to like you the most still talk about you negatively sometimes when you\'re not around.',
  'Most New Year\'s resolutions fail within weeks — yours are statistically likely to as well.',
  'The career ladder you\'re climbing has far more people at the bottom than the top, and you\'re not guaranteed a spot near it.',
  'Loneliness increases with age for most people, even those who are surrounded by family.',
  'A large percentage of your waking hours will be spent working just to pay for necessities you didn\'t choose.',
  'Most of what you post online is seen briefly, forgotten quickly, and never truly appreciated.',
  'The version of yourself you imagined becoming by now probably looks nothing like who you actually are.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('demoralize')
    .setDescription('Delivers a random demoralizing fact about humans'),

  async execute(interaction) {
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
    await interaction.reply(fact);
  },
};
