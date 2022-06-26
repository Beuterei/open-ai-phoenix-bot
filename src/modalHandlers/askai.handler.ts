import { MessageEmbed } from 'discord.js';
import { OpenAI } from '../clients/openai.client';
import { ModalID } from '../shared/discord';
import { registerModalHandler, formatDiscordString } from '../util/discord.helper';

export = registerModalHandler(ModalID.ASK_AI, async modal => {
    await modal.deferReply({});

    const prompt = modal.getTextInputValue('prompt');

    const entryText = `${prompt}\n`;

    const openAiClient = new OpenAI();

    const res = await openAiClient.completePrompt(entryText);

    const answer = formatDiscordString(entryText + res.choices[0].text);

    console.log(`Send ${answer.split('\n').join('')}`);

    const greentextEmbed = new MessageEmbed()
        .setColor('#966096')
        .setTitle('OpenAI:')
        .setDescription(answer);

    modal.editReply({ embeds: [greentextEmbed] });
});
