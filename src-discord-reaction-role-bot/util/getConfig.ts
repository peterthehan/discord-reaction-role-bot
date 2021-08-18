import { Message, Snowflake } from "discord.js";
import configs from "../config.json";
import { Config } from "../types";

const configMap: Map<Snowflake, Config> = new Map();
(configs as Config[]).forEach((config) => {
  configMap.set(config.messageId, config);
});

function getConfig(message: Message): Config | undefined {
  if (!configMap.has(message.id)) {
    return;
  }

  return configMap.get(message.id);
}

export { getConfig };
