const { rules } = require('../config');

module.exports = message => rules[message.id];
