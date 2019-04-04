const { models } = require('../config');

module.exports = message => models[message.id];
