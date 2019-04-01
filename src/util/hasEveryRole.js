module.exports = (member, roleIds) =>
  roleIds.every(roleId => member.roles.some(role => role.id === roleId));
