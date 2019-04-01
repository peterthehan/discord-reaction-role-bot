const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => handler('ready')(client));
  client.on('messageReactionAdd', handler('messageReactionAdd'));
  process.on('unhandledRejection', console.warn);
};
