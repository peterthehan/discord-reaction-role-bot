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
      emojiRoleMap: {
        '\u0031\u20E3': ['349040254600216576'],
        '\u0032\u20E3': ['349040055525965835'],
        '\u0033\u20E3': ['349039979219124225']
      }
    }
  }
};
