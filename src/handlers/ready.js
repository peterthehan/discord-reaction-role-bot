const { models } = require('../config');

module.exports = async client => {
  console.log(`${client.user.tag}: Ready`);

  for (const { messageId, channelId, emojiRoleMap } of models) {
    const channel = await client.channels.fetch(channelId);
    if (channel.type !== 'text') {
      continue;
    }

    const message = await channel.messages.fetch(messageId);
    if (!message) {
      continue;
    }

    // await message.reactions.removeAll();
    emojiRoleMap.forEach(async ({ emoji }) => await message.react(emoji));
  }
};
