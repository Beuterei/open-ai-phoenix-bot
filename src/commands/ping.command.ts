import { SlashCommandBuilder } from '@discordjs/builders';
import { registerCommand } from '../util/discord.helper';

export = registerCommand(
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async (interaction) => {
        await interaction.reply({ content: 'Pong!', ephemeral: true })
    },
);
