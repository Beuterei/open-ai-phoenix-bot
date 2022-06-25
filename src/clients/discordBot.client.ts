import discordEscape from 'discord-escape';
import { AnyChannel, Client, Intents, MessageEmbed, TextChannel } from 'discord.js';
import { OpenAI } from './openai.client';

enum Command {
    ASK_AI = 'askai',
}

const isTextChannel = (channel: AnyChannel): channel is TextChannel => channel.isText();

const prefix = '!';

export class DiscordBot {
    private discordClient: Client;

    private openAiClient: OpenAI;

    constructor() {
        this.discordClient = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        });
        this.openAiClient = new OpenAI();

        this.discordClient.on('messageCreate', async message => {
            if (message.author.bot) return;
            if (!message.content.startsWith(prefix)) return;

            const commandMessage = this.parseCommandMessage(message.content);

            if (!commandMessage) return;

            switch (commandMessage.command) {
                case Command.ASK_AI:
                    console.log(`Command ${Command.ASK_AI}!`);

                    if (!commandMessage.context) {
                        console.log('No context parameter found');
                        message.channel.send('No context parameter found');
                        break;
                    }

                    message.channel.send('Talking to the AI gods...');

                    const entryText = `${commandMessage.context}\n`;

                    const res = await this.openAiClient.complete(entryText);

                    const answer = this.sterilizeString(entryText + res.choices[0].text);

                    console.log(`Send ${answer.split('\n').join('')}`);

                    const greentextEmbed = new MessageEmbed()
                        .setColor('#966096')
                        .setTitle('OpenAI:')
                        .setDescription(answer);

                    message.channel.send({ embeds: [greentextEmbed] });
                    break;
            }
        });
    }

    async dailyGreentext() {
        const channel = this.getChannel(process.env.BOT_CHANNEL_ID || '');
        console.log('Time for an automated greentext!');

        const entryText = '> be me\n';

        const res = await this.openAiClient.complete(`write a 4chan greentext \n${entryText}`);

        const answer = this.sterilizeString(entryText + res.choices[0].text);

        console.log(`Send ${answer.split('\n').join('')}`);

        const greentextEmbed = new MessageEmbed()
            .setColor('#7f9739')
            .setTitle('dailygreentext.png')
            .setDescription(answer);

        channel.send({ embeds: [greentextEmbed] });
    }

    private sterilizeString(str: string) {
        return discordEscape(str).replace(/[\r\n]{2,}/g, "\n");
    }

    private getChannel(id: string) {
        const channel = this.discordClient.channels.cache.find(
            channel => channel.id === id,
        );

        if (!channel || !isTextChannel(channel))
            throw new Error('Channel id not found or channel is not a text channel');

            return channel;
    }

    private parseCommandMessage(messageContent: string) {
        const commandMessage = messageContent.slice(prefix.length);

        const commandKey = Object.keys(Command).find(el =>
            commandMessage.startsWith(Command[el as keyof typeof Command]),
        );

        if (!commandKey) return;

        return {
            command: Command[commandKey as keyof typeof Command],
            context: commandMessage
                .slice(Command[commandKey as keyof typeof Command].length)
                .trim(),
        };
    }

    async init() {
        await this.discordClient.login(process.env.BOT_TOKEN);
        this.discordClient.user?.setActivity(process.env.BOT_ACTIVITY || '', { type: 'COMPETING' });
    }
}
