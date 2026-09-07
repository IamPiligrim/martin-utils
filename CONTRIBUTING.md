# Contributing to Martin Utils

Thanks for considering a contribution! This is a small Discord bot, so the process is kept light on purpose.

## Getting set up

1. Fork the repo and clone your fork.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your own `config.json` in the project root (it's gitignored, never commit it):
   ```json
   {
     "token": "YOUR_TEST_BOT_TOKEN",
     "clientId": "YOUR_TEST_APPLICATION_ID"
   }
   ```
   Use a separate test bot/application for development — don't use the production bot's credentials.
4. Run the bot:
   ```bash
   node src/bot.js
   ```
   Slash commands are registered automatically on startup. If you only want to (re)register commands without starting the bot, run:
   ```bash
   node src/deploy-commands.js
   ```

## Adding or changing a command

Commands are loaded automatically from `src/commands/**` — any `.js` file there that exports `data` (a `SlashCommandBuilder`) and `execute` (an async handler) becomes a working slash command, no wiring required.

1. Pick (or create) a category folder under `src/commands/` — e.g. `image/`, `misc/`.
2. Create a new file, e.g. `src/commands/misc/mycommand.js`:
   ```js
   const { SlashCommandBuilder } = require('discord.js');

   module.exports = {
     data: new SlashCommandBuilder()
       .setName('mycommand')
       .setDescription('What this command does'),

     async execute(interaction) {
       await interaction.reply('Hello!');
     },
   };
   ```
3. Keep command names lowercase, hyphen-free (Discord slash command naming rules), and descriptions short and clear.
4. If your command needs an asset (image, font, etc.), put it under `src/media/` and reference it with a relative path, following the pattern in `framethis.js`.
5. Test the command manually against your test bot before opening a PR.

## Code style

- Match the existing style in the file you're editing (2-space indentation, semicolons, `const`/`let`).
- Keep commands focused — one command per file, one responsibility per command.
- Avoid adding new dependencies unless there's a clear need; prefer what `discord.js` and `@napi-rs/canvas` already provide.
- No linter/formatter is configured yet, so just keep diffs clean and consistent with surrounding code.

## Submitting changes

1. Create a branch off `main` with a descriptive name (e.g. `feature/mycommand`, `fix/framethis-bounds`).
2. Make your changes and commit with a clear, concise message describing *why* the change was made.
3. Push your branch and open a pull request against `main`.
4. In the PR description, mention:
   - what the change does,
   - how you tested it (which command, what output/screenshot),
   - any new config or setup steps a reviewer needs.
5. Be responsive to review feedback — small, focused PRs get merged faster than large ones.

## Reporting bugs / suggesting ideas

Open an issue describing:
- what you expected to happen,
- what actually happened (include error messages/logs if any),
- steps to reproduce, if it's a bug.

Fun command ideas are welcome too — this bot is meant to grow with small, self-contained additions.
