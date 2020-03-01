const { rules } = require('../config');
const getMember = require('../util/getMember');
const isValidMessageReactionAdd = require('../util/isValidMessageReactionAdd');

module.exports = async (messageReaction, user) => {
  if (!isValidMessageReactionAdd(messageReaction, user)) return;

  const rule = rules[messageReaction.message.id];
  if (!rule) return;

  const emojiKey = messageReaction.emoji.id
    ? messageReaction.emoji.id
    : messageReaction.emoji.name;
  const roleIds = rule.emojiRoleMap[emojiKey];
  if (!roleIds) return;

  const member = await getMember(user, rule);
  if (!member) return;

  messageReaction.users.remove(user);

  if (roleIds.every(roleId => member.roles.cache.has(roleId))) {
    return await member.roles.remove(roleIds);
  }

  await member.roles.add(roleIds);
  if (!rule.isUnique) return;

  const roleIdsToRemove = [
    ...new Set(Object.values(rule.emojiRoleMap).flat())
  ].filter(roleId => !roleIds.includes(roleId));
  await member.roles.remove(roleIdsToRemove);
};
