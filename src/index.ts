import { CronJob } from 'cron';
import { DiscordBotClient } from './clients/discordBot.client';
import { dailyGreentextHandler } from './cronHandlers/dailyGreentext.handler';

(async () => {
    const discordClient = new DiscordBotClient();
    await discordClient.init();

    console.log('Initialized!');

    if (process.env.DISCORD_BOT_GREENTEXT_CRON)
        new CronJob(
            process.env.DISCORD_BOT_GREENTEXT_CRON,
            () => () => dailyGreentextHandler(discordClient),
        ).start();
})();
