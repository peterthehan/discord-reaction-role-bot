import { Snowflake } from "discord.js";

export type Policy = "once" | "any" | "unique";

export interface Config {
  messageId: Snowflake;
  channelId: Snowflake;
  removeReaction: boolean;
  policy?: Policy;
  emojiRoleMap: Record<string, Snowflake[]>;
}
