const flattenArray = require('../util/flattenArray');
const getEmojiKey = require('../util/getEmojiKey');
const getRoleIds = require('../util/getRoleIds');
const getMember = require('../util/getMember');
const getModel = require('../util/getModel');
const hasEveryRole = require('../util/hasEveryRole');
const removeDuplicates = require('../util/removeDuplicates');

module.exports = async (messageReaction, user) => {
  if (user.bot) return;

  const model = getModel(messageReaction.message);
  if (!model) return;

  const roleIds = getRoleIds(getEmojiKey(messageReaction.emoji), model);
  if (!roleIds) return;

  const member = await getMember(user, model);
  if (!member) return;

  messageReaction.users.remove(user);

  if (hasEveryRole(member, roleIds)) {
    return await member.roles.remove(roleIds);
  }

  await member.roles.add(roleIds);
  if (!model.isUnique) return;

  const roleIdsToRemove = removeDuplicates(
    flattenArray(Object.values(model.emojiRoleMap))
  ).filter(roleId => !roleIds.includes(roleId));
  await member.roles.remove(roleIdsToRemove);
};
