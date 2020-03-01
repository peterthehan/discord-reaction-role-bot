const { rules } = require('../config');
const getMember = require('../util/getMember');
const isValidMessageReactionAdd = require('../util/isValidMessageReactionAdd');

module.exports = async (messageReaction, user) => {
  if (!isValidMessageReactionAdd(messageReaction, user)) return;

  const rule = rules[messageReaction.message.id];
  if (!rule) return;

  const emojiKey =
    messageReaction.emoji[messageReaction.emoji.id ? 'id' : 'name'];
  const roleIdsToAdd = rule.emojiRoleMap[emojiKey];
  if (!roleIdsToAdd) return;

  const member = await getMember(user, rule);
  if (!member) return;

  messageReaction.users.remove(user);

  if (roleIdsToAdd.every(roleId => member.roles.cache.has(roleId))) {
    return await member.roles.remove(roleIdsToAdd);
  }

  if (!rule.isUnique) {
    return await member.roles.add(roleIdsToAdd);
  }

  const currentRoleIds = member.roles.cache.map(role => role.id);
  const roleIdsToRemove = [...new Set(Object.values(rule.emojiRoleMap).flat())];
  const roleIdsToSet = [
    ...currentRoleIds.filter(roleId => !roleIdsToRemove.includes(roleId)),
    ...roleIdsToAdd
  ];

  return await member.roles.set(roleIdsToSet);
};
