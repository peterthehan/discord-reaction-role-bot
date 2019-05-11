const flattenArray = require('../util/flattenArray');
const getEmojiKey = require('../util/getEmojiKey');
const getMember = require('../util/getMember');
const getRoleIds = require('../util/getRoleIds');
const getRule = require('../util/getRule');
const hasEveryRole = require('../util/hasEveryRole');
const removeDuplicates = require('../util/removeDuplicates');

module.exports = async (messageReaction, user) => {
  if (user.bot) return;

  const rule = getRule(messageReaction.message.id);
  if (!rule) return;

  const roleIds = getRoleIds(getEmojiKey(messageReaction.emoji), rule);
  if (!roleIds) return;

  const member = await getMember(user, rule);
  if (!member) return;

  messageReaction.users.remove(user);

  if (hasEveryRole(member, roleIds)) {
    return await member.roles.remove(roleIds);
  }

  await member.roles.add(roleIds);
  if (!rule.isUnique) return;

  const roleIdsToRemove = removeDuplicates(
    flattenArray(Object.values(rule.emojiRoleMap))
  ).filter(roleId => !roleIds.includes(roleId));
  await member.roles.remove(roleIdsToRemove);
};
