module.exports = (messageReaction, user) => {
  if (user.bot) return false;

  if (messageReaction.message.channel.type !== 'type') return false;

  return true;
};
