const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, clientId } = require('../config.json');

const commands = [];

function collectCommands(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      collectCommands(path.join(dir, entry.name));
    } else if (entry.name.endsWith('.js')) {
      const command = require(path.join(dir, entry.name));
      if (command.data) commands.push(command.data.toJSON());
    }
  }
}

collectCommands(path.join(__dirname, 'commands'));

const rest = new REST().setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(data => console.log(`Зарегистрировано ${data.length} команд.`))
  .catch(console.error);