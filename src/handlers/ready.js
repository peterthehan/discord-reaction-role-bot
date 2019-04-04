const { models } = require('../config');

module.exports = async client => {
  console.log(`${client.user.tag}: Ready`);

  for (const messageId of Object.keys(models)) {
    const { channelId } = models[messageId];

    const channel = await client.channels.fetch(channelId);
    if (channel.type !== 'text') continue;

    const message = await channel.messages.fetch(messageId);
    if (!message) continue;

    const { emojiRoleMap } = models[messageId];
    emojiRoleMap.forEach(async ({ emoji }) => await message.react(emoji));
  }
};
