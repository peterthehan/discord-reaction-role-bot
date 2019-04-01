const { models } = require('../config');

module.exports = message =>
  models.find(({ messageId }) => messageId === message.id);
