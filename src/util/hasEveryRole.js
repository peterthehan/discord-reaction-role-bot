module.exports = (member, roleIds) =>
  roleIds.every(roleId => member.roles.get(roleId));
