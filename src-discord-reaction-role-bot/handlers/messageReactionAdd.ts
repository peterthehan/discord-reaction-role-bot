import { Message, MessageReaction, User } from "discord.js";
import { ReactionRoleManager } from "../classes/ReactionRoleManager";
import { getConfig } from "../util/getConfig";

module.exports = async (
  messageReaction: MessageReaction,
  user: User
): Promise<void> => {
  const config = getConfig(messageReaction.message as Message);
  if (!config) {
    return;
  }

  const manager = new ReactionRoleManager(messageReaction, user, config);
  manager.setRoles();
};
