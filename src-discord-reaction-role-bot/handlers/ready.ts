import { BaseGuildTextChannel, Client } from "discord.js";
import configs from "../config.json";

module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  for (const config of configs) {
    const channel = await client.channels.fetch(config.channelId);
    if (!channel || channel.type === "DM") {
      continue;
    }

    const message = await (channel as BaseGuildTextChannel).messages.fetch(
      config.messageId
    );

    Object.keys(config.emojiRoleMap).forEach(
      async (emoji) => await message.react(emoji)
    );
  }
};
