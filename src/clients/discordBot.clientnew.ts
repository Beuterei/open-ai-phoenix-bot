import { REST } from '@discordjs/rest';
import { Client, Collection, CommandInteraction, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { readdirSync } from 'fs';
import path from 'path';
import { registerCommand, registerModalHandler } from '../util/discord.helper';
import discordModals, { ModalSubmitInteraction } from 'discord-modals';

export class DiscordBotClient extends Client {
    private commands: Collection<string, ReturnType<typeof registerCommand>>;

    private modalHandlers: Collection<string, ReturnType<typeof registerModalHandler>>;

    private restClient: REST;

    private restCommands: Array<unknown> = [];

    constructor() {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        });

        discordModals(this);

        this.restClient = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

        this.commands = new Collection();

        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = readdirSync(commandsPath).filter(file =>
            ['command.js', 'command.ts'].some(char => file.endsWith(char)),
        );

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            // TODO: typecheck this any
            this.restCommands.push(command.data.toJSON());
            this.commands.set(command.data.name, command);
        }

        // TODO: extract
        this.modalHandlers = new Collection();

        const modalHandlersPath = path.join(__dirname, '../modalHandlers');
        const modalHandlerFiles = readdirSync(modalHandlersPath).filter(file =>
            ['handler.js', 'handler.ts'].some(char => file.endsWith(char)),
        );

        for (const file of modalHandlerFiles) {
            const filePath = path.join(modalHandlersPath, file);
            const handler = require(filePath);

            // TODO: typecheck this any
            this.modalHandlers.set(handler.customId, handler);
        }

        this.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            const command = this.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, this);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        });

        this.on('modalSubmit', async (modal: ModalSubmitInteraction) => {
            const handler = this.modalHandlers.get(modal.customId);

            if (!handler) return;

            try {
                await handler.handler(modal);
            } catch (error) {
                console.error(error);
                await modal.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        });
    }

    async init() {
        await this.login(process.env.DISCORD_BOT_TOKEN);
        await this.restClient.put(Routes.applicationCommands(process.env.DISCORD_APP_ID || ''), {
            body: this.restCommands,
        });
        this.user?.setActivity(process.env.DISCORD_BOT_ACTIVITY || '', { type: 'COMPETING' });
    }
}
