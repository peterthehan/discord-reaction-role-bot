const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => handler('ready')(client));
  client.on('messageReactionAdd', handler('messageReactionAdd'));
  client.on('messageReactionRemove', handler('messageReactionRemove'));
  process.on('unhandledRejection', console.warn);
};
