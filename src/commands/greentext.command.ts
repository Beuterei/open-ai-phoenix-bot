import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { OpenAI } from '../clients/openai.client';
import { greentextPrompts } from '../data/greentext';
import { formatDiscordString, registerCommand } from '../util/discord.helper';

export = registerCommand(
    new SlashCommandBuilder()
        .setName('greentext')
        .setDescription('Replies with a AI generated greentext')
        .addBooleanOption(option =>
            option
                .setName('autoprompt')
                .setDescription('Use a random greentext prompt form preset.'),
        ),
    async interaction => {
        await interaction.deferReply();

        const entryText = interaction.options.getBoolean('autoprompt') ? greentextPrompts[Math.floor(Math.random() * greentextPrompts.length)] : '> be me\n';

        const openAiClient = new OpenAI();

        const res = await openAiClient.completePrompt(`write a 4chan greentext\n${entryText}`);

        const answer = formatDiscordString(entryText + res.choices[0].text);

        console.log(`Send ${answer.split('\n').join('')}`);

        const greentextEmbed = new MessageEmbed()
            .setColor('#7f9739')
            .setTitle(entryText)
            .setDescription(answer);

        interaction.editReply({ embeds: [greentextEmbed] });
    },
);
