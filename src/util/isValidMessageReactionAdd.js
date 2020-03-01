module.exports = (messageReaction, user) => {
  if (user.bot) return false;

  if (messageReaction.message.channel.type !== 'text') return false;

  return true;
};
