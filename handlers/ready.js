const { rules } = require('../config');

module.exports = async client => {
  console.log('reactionRole: ready');

  for (const messageId of Object.keys(rules)) {
    const { channelId, emojiRoleMap } = rules[messageId];

    const channel = await client.channels.fetch(channelId);
    if (channel.type !== 'text') continue;

    const message = await channel.messages.fetch(messageId);
    if (!message) continue;

    Object.keys(emojiRoleMap).forEach(
      async emoji => await message.react(emoji)
    );
  }
};
