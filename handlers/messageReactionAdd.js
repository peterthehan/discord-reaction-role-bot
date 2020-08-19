const getEmoji = (messageReaction) => {
  return messageReaction.emoji.id || messageReaction.emoji.name;
};

const getMember = async (rule, user) => {
  const channel = await user.client.channels.fetch(rule.channelId);

  return channel && channel.guild.members.fetch(user);
};

const assignRoles = async (rule, roleIds, member) => {
  if (roleIds.every((roleId) => member.roles.cache.has(roleId))) {
    return member.roles.remove(roleIds);
  }

  if (!rule.isUnique) {
    return member.roles.add(roleIds);
  }

  const currentRoleIds = member.roles.cache.map((role) => role.id);
  const roleIdsToRemove = [...new Set(Object.values(rule.emojiRoleMap).flat())];
  const roleIdsToSet = [
    ...currentRoleIds.filter((roleId) => !roleIdsToRemove.includes(roleId)),
    ...roleIds,
  ];

  return member.roles.set(roleIdsToSet);
};

module.exports = async (messageReaction, user) => {
  if (
    user.bot ||
    user.system ||
    messageReaction.message.channel.type !== "text" ||
    !(messageReaction.message.id in user.client.reactionRoleRules)
  ) {
    return;
  }

  messageReaction.users.remove(user);

  const rule = user.client.reactionRoleRules[messageReaction.message.id];
  const roleIds = rule.emojiRoleMap[getEmoji(messageReaction)];
  if (!roleIds) {
    return;
  }

  const member = await getMember(rule, user);
  if (!member) {
    return;
  }

  assignRoles(rule, roleIds, member);
};
