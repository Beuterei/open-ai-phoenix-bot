import { CronJob } from 'cron';
import { DiscordBotClient } from './clients/discordBot.client';
import { greentextHandler } from './cronHandlers/greentext.handler';
import { wikipediaHandler } from './cronHandlers/wikipedia.handler';

(async () => {
    const discordClient = new DiscordBotClient();
    await discordClient.init();

    console.log('Initialized!');

    if (process.env.DISCORD_BOT_GREENTEXT_CRON)
        new CronJob(process.env.DISCORD_BOT_GREENTEXT_CRON, () =>
            greentextHandler(discordClient),
        ).start();

    if (process.env.DISCORD_BOT_WIKI_CRON)
        new CronJob(process.env.DISCORD_BOT_WIKI_CRON, () =>
            wikipediaHandler(discordClient),
        ).start();
})();
