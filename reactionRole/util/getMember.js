module.exports = async (user, rule) => {
  const channel = await user.client.channels.fetch(rule.channelId);
  return channel.guild.members.fetch(user);
};
