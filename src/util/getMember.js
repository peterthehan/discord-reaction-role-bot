module.exports = async (user, model) => {
  const channel = await user.client.channels.fetch(model.channelId);
  return channel.guild.members.fetch(user);
};
