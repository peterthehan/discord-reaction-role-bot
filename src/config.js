const config = (() => {
  const { TOKEN } =
    process.env.NODE_ENV === 'production' ? process.env : require('../config');

  return { TOKEN };
})();

module.exports = {
  token: config.TOKEN,
  models: {
    '523403415171235840': {
      channelId: '258314939998011393',
      isUnique: true,
      emojiRoleMap: [
        { emoji: '\u0031\u20E3', roleIds: ['349040254600216576'] },
        { emoji: '\u0032\u20E3', roleIds: ['349040055525965835'] },
        { emoji: '\u0033\u20E3', roleIds: ['349039979219124225'] }
      ]
    }
  }
};
