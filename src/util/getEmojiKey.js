module.exports = emoji =>
  !emoji.id ? emoji.name : `${emoji.name}:${emoji.id}`;
