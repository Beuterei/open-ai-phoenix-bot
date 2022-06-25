import { CronJob } from 'cron';
import { DiscordBot } from './clients/discordBot.client';

(async () => {
    const discordClient = new DiscordBot();
    await discordClient.init();

    console.log('Initialized!');

    if (process.env.BOT_GREENTEXT_CRON)
        new CronJob(process.env.BOT_GREENTEXT_CRON, () =>
            discordClient.dailyGreentext(),
        ).start();
})();
