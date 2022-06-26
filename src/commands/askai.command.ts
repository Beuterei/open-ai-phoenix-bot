import { SlashCommandBuilder } from '@discordjs/builders';
import { Modal, showModal, TextInputComponent } from 'discord-modals';
import { ModalID } from '../shared/discord';
import { registerCommand } from '../util/discord.helper';

export = registerCommand(
    new SlashCommandBuilder()
        .setName('askai')
        .setDescription('Completes what ever you ask the AI gods'),
    async (interaction, client) => {
        const modal = new Modal()
            .setCustomId(ModalID.ASK_AI)
            .setTitle('Ask the AI gods')
            .addComponents(
                new TextInputComponent()
                    .setCustomId('prompt')
                    .setLabel('Prompt')
                    .setStyle('LONG')
                    .setPlaceholder('How will you take over the world?')
                    .setMaxLength(1000)
                    .setRequired(true),
            );

        await showModal(modal, {
            client: client,
            interaction: interaction,
        });
    },
);
