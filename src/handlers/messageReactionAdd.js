const flattenArray = require('../util/flattenArray');
const getEmojiKey = require('../util/getEmojiKey');
const getEmojiRole = require('../util/getEmojiRole');
const getMember = require('../util/getMember');
const getModel = require('../util/getModel');
const hasEveryRole = require('../util/hasEveryRole');
const removeDuplicates = require('../util/removeDuplicates');

module.exports = async (messageReaction, user) => {
  if (user.bot) return;

  const model = getModel(messageReaction.message);
  if (!model) return;

  const emojiRole = getEmojiRole(getEmojiKey(messageReaction.emoji), model);
  if (!emojiRole) return;

  const member = await getMember(user, model);
  if (!member) return;

  messageReaction.users.remove(user);

  if (hasEveryRole(member, emojiRole.roleIds)) {
    return await member.roles.remove(emojiRole.roleIds);
  }

  await member.roles.add(emojiRole.roleIds);
  if (!model.isUnique) return;

  const roleIds = removeDuplicates(
    flattenArray(model.emojiRoleMap.map(i => i.roleIds))
  ).filter(roleId => !emojiRole.roleIds.includes(roleId));
  await member.roles.remove(roleIds);
};
