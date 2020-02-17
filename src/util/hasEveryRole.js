module.exports = (member, roleIds) =>
  roleIds.every(roleId => member.roles.cache.has(roleId));
