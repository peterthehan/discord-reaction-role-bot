module.exports = (emojiKey, model) =>
  model.emojiRoleMap.find(({ emoji }) => emoji === emojiKey);
