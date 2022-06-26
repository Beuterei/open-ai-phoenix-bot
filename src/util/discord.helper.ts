import { SlashCommandBuilder } from '@discordjs/builders';
import discordEscape from 'discord-escape';
import { ModalSubmitInteraction } from 'discord-modals';
import { CommandInteraction, TextChannel } from 'discord.js';
import { DiscordBotClient } from '../clients/discordBot.client';
import { ModalID } from '../shared/discord';

const lengthCut = '[...]';
const maxLength = 4000;

export const registerCommand = (
    builder: Partial<SlashCommandBuilder>,
    execute: (interaction: CommandInteraction, client: DiscordBotClient) => void,
) => ({ data: builder, execute });

export const registerModalHandler = (
    customId: ModalID,
    handler: (modal: ModalSubmitInteraction) => void,
) => ({ customId, handler });

export const formatDiscordString = (str: string) => {
    let result = discordEscape(str).replace(/[\r\n]{2,}/g, '\n');

    if (result.length >= maxLength) {
        result = result.substring(0, maxLength - lengthCut.length) + lengthCut;
    }

    return result;
};

export const getTextChannel = (channelId: string, client: DiscordBotClient) => {
    const channel = client.channels.cache.find(channel => channel.id === channelId);

    if (!channel || !channel.isText())
        throw new Error('Channel id not found or channel is not a text channel');

    return channel as TextChannel;
};
