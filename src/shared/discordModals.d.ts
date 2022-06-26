import { InteractionReplyOptions, MessagePayload } from "discord.js";

declare module 'discord-modals' {
    interface ModalSubmitInteraction {
        editReply(
            options: string | MessagePayload | InteractionReplyOptions
          ): Promise<void>;
    }
}
