// eslint-disable-next-line no-unused-vars
const { Client } = require("discord.js");
const rules = require("../config");

/**
 * @function
 * @param {Client} client
 * @returns {Promise<void>}
 */
module.exports = async (client) => {
  console.log("reactionRole: ready");

  client.reactionRoleRules = {};
  for (const rule of rules) {
    client.reactionRoleRules[rule.messageId] = rule;
    const channel = await client.channels.fetch(rule.channelId);
    const message = await channel.messages.fetch(rule.messageId);

    Object.keys(rule.emojiRoleMap).forEach(
      async (emoji) => await message.react(emoji)
    );
  }
};
