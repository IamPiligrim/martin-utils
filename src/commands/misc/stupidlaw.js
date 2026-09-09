const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const LAWS = [
  { country: 'United Kingdom', flag: '🇬🇧', law: 'It is illegal to die in the Houses of Parliament.', punishment: 'No penalty exists — the law cannot be enforced posthumously.' },
  { country: 'USA (Alabama)', flag: '🇺🇸', law: 'It is illegal to play dominoes on Sundays.', punishment: 'Fine up to $100.' },
  { country: 'USA (Alaska)', flag: '🇺🇸', law: 'It is illegal to wake a sleeping bear to take its photograph.', punishment: 'Fine + possible charge for creating a life-threatening situation.' },
  { country: 'USA (California)', flag: '🇺🇸', law: 'It is illegal to hunt butterflies without a license.', punishment: 'Fine up to $500.' },
  { country: 'Switzerland', flag: '🇨🇭', law: 'It is illegal to flush the toilet after 10 PM in apartment buildings.', punishment: 'Warning from the landlord; repeat offenses can lead to a court-ordered fine.' },
  { country: 'France', flag: '🇫🇷', law: 'It is illegal to name a pig Napoleon.', punishment: 'Fine for insulting historical memory.' },
  { country: 'Germany', flag: '🇩🇪', law: 'It is illegal to run out of gas on the autobahn.', punishment: 'Fine of €30–€70.' },
  { country: 'Singapore', flag: '🇸🇬', law: 'Chewing gum is banned (except medicinal gum, by prescription).', punishment: 'Fine up to 1,000 SGD; selling it can bring a fine up to 100,000 SGD and/or up to 2 years in prison.' },
  { country: 'Thailand', flag: '🇹🇭', law: 'It is illegal to leave your house without underwear.', punishment: 'Fine under local administrative code.' },
  { country: 'Australia (Victoria)', flag: '🇦🇺', law: 'You need an electrician\'s license to change a lightbulb.', punishment: 'Fine for unlicensed electrical work.' },
  { country: 'Canada', flag: '🇨🇦', law: 'It is illegal to pay for an item worth more than $10 entirely in 25-cent coins.', punishment: 'The seller may refuse the payment — there is no legal penalty.' },
  { country: 'Italy (Milan)', flag: '🇮🇹', law: 'By law you must smile at all times, except at funerals or while visiting a hospital.', punishment: 'Technically a fine, though never enforced in practice.' },
  { country: 'Greece', flag: '🇬🇷', law: 'It is illegal to wear high heels while visiting ancient monuments.', punishment: 'Denial of entry to the site.' },
  { country: 'Sweden', flag: '🇸🇪', law: 'It is illegal to wash your car in an apron (being naked is fine).', punishment: 'Technically a fine for violating household norms.' },
  { country: 'USA (Florida)', flag: '🇺🇸', law: 'Unmarried women are forbidden from parachuting on Sundays.', punishment: 'Fine under local code.' },
  { country: 'USA (Utah)', flag: '🇺🇸', law: 'It is illegal to hunt whales.', punishment: 'A hefty fine — despite the total absence of whales in the state.' },
  { country: 'Indonesia (Bali)', flag: '🇮🇩', law: 'You cannot walk around naked even inside your own home if it is visible from outside.', punishment: 'Fine or administrative detention.' },
  { country: 'Denmark', flag: '🇩🇰', law: 'Before starting your car, you must check that no children are underneath it.', punishment: 'Fine for violating safety regulations.' },
  { country: 'USA (Michigan)', flag: '🇺🇸', law: 'It is illegal to tie an alligator to a fire hydrant.', punishment: 'Fine + confiscation of the alligator.' },
  { country: 'United Kingdom (York)', flag: '🇬🇧', law: 'A law technically never repealed once permitted shooting a Scotsman with a bow within the city walls — but not on Sundays.', punishment: 'In practice: prosecution for murder, as modern law overrides the ancient one.' },
  { country: 'USA (Oklahoma)', flag: '🇺🇸', law: 'It is illegal to make ugly faces at a dog.', punishment: 'Fine or up to 30 days in jail.' },
  { country: 'China', flag: '🇨🇳', law: 'Reincarnation of Buddhist monks without government approval is prohibited.', punishment: 'The reincarnation is declared illegal and invalid.' },
  { country: 'Spain', flag: '🇪🇸', law: 'Feeding pigeons is banned in most squares of major cities.', punishment: 'Fine of €90–€750 depending on the city.' },
  { country: 'USA (Arizona)', flag: '🇺🇸', law: 'Donkeys are forbidden from sleeping in bathtubs.', punishment: 'Fine under local ordinance.' },
  { country: 'Austria', flag: '🇦🇹', law: 'It is illegal to wash your windows while standing on the windowsill of your own home.', punishment: 'Fine for violating workplace safety standards.' },
  { country: 'Brazil', flag: '🇧🇷', law: 'It is illegal to burn an effigy of a real person.', punishment: 'Fine and possible criminal charges for defamation.' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stupidlaw')
    .setDescription('Shows a random stupid law from a random country'),

  async execute(interaction) {
    const { country, flag, law, punishment } = LAWS[Math.floor(Math.random() * LAWS.length)];

    const embed = new EmbedBuilder()
      .setTitle(`${flag} ${country}`)
      .setDescription(law)
      .setFooter({ text: `Punishment: ${punishment}` })
      .setColor(0xE67E22);

    await interaction.reply({ embeds: [embed] });
  },
};
