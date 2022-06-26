import { MessageEmbed } from 'discord.js';
import { OpenAI } from '../clients/openai.client';
import { ModalID } from '../shared/discord';
import { registerModalHandler, sterilizeString } from '../util/discord.helper';

export = registerModalHandler(ModalID.ASK_AI, async modal => {
    const prompt = modal.getTextInputValue('prompt');

    const entryText = `${prompt}\n`;

    const openAiClient = new OpenAI();

    const res = await openAiClient.completePrompt(entryText);

    const answer = sterilizeString(entryText + res.choices[0].text);

    console.log(`Send ${answer.split('\n').join('')}`);

    const greentextEmbed = new MessageEmbed()
        .setColor('#966096')
        .setTitle('OpenAI:')
        .setDescription(answer);

    modal.reply({ embeds: [greentextEmbed] });
});
