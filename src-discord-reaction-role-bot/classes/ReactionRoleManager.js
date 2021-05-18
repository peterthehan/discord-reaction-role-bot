// eslint-disable-next-line no-unused-vars
const { GuildMember, MessageReaction, User } = require("discord.js");

/**
 * @typedef {Object} Rule
 * @property {string} messageId
 * @property {string} channelId
 * @property {boolean} removeReaction
 * @property {('once'|'any'|'unique')} [policy]
 * @property {Record<string, string[]>} emojiRoleMap
 */

module.exports = class ReactionRoleManager {
  /**
   * @param {MessageReaction} messageReaction
   * @param {User} user
   */
  constructor(messageReaction, user) {
    /**
     * @private
     * @type {MessageReaction}
     */
    this.messageReaction = messageReaction;

    /**
     * @private
     * @type {User}
     */
    this.user = user;

    /**
     * @private
     * @type {?Rule}
     */
    this.rule = null;

    /**
     * @private
     * @type {?string[]}
     */
    this.roleIds = null;

    /**
     * @private
     * @type {?GuildMember}
     */
    this.member = null;
  }

  /**
   * @readonly
   * @type {string}
   */
  get emoji() {
    return this.messageReaction.emoji.id || this.messageReaction.emoji.name;
  }

  /**
   * @readonly
   * @returns {string[]}
   */
  get ruleRoleIds() {
    return [...new Set(Object.values(this.rule.emojiRoleMap).flat())];
  }

  /**
   * @returns {Promise<boolean>}
   */
  async validateInput() {
    if (
      this.user.bot ||
      this.user.system ||
      this.messageReaction.message.channel.type !== "text"
    ) {
      return false;
    }

    if (!this.setRule() || !this.setRoleIds() || !(await this.setMember())) {
      return false;
    }

    return true;
  }

  /**
   * @returns {boolean}
   */
  setRule() {
    this.rule = this.user.client.reactionRoleRules[
      this.messageReaction.message.id
    ];

    return Boolean(this.rule);
  }

  /**
   * @returns {boolean}
   */
  setRoleIds() {
    this.roleIds = this.rule.emojiRoleMap[this.emoji];

    return Boolean(this.roleIds);
  }

  /**
   * @returns {Promise<boolean>}
   */
  async setMember() {
    const channel = await this.user.client.channels.fetch(this.rule.channelId);
    this.member = channel && (await channel.guild.members.fetch(this.user));

    return Boolean(this.member);
  }

  /**
   * @returns {Promise<void>}
   */
  async handleUserReaction() {
    if (this.rule.removeReaction) {
      this.messageReaction.users.remove(this.user);
    }
  }

  /**
   * @returns {boolean}
   */
  memberHasSomeRoleInRuleRoles() {
    return this.ruleRoleIds.some((roleId) =>
      this.member.roles.cache.has(roleId)
    );
  }

  /**
   * @returns {boolean}
   */
  memberHasEveryRoleInRoles() {
    return this.roleIds.every((roleId) => this.member.roles.cache.has(roleId));
  }

  /**
   * @returns {Promise<void>}
   */
  async removeRolesFromMember() {
    this.member.roles.remove(this.roleIds);
  }

  /**
   * @returns {Promise<void>}
   */
  async addRolesToMember() {
    this.member.roles.add(this.roleIds);
  }

  /**
   * @returns {Promise<void>}
   */
  async setRolesToMember() {
    const currentRoleIds = this.member.roles.cache.map((role) => role.id);
    const roleIdsToSet = [
      ...currentRoleIds.filter((roleId) => !this.ruleRoleIds.includes(roleId)),
      ...this.roleIds,
    ];

    this.member.roles.set(roleIdsToSet);
  }

  /**
   * @returns {Promise<void>}
   */
  async assignRoles() {
    switch (this.rule.policy) {
      case "once": {
        if (this.memberHasSomeRoleInRuleRoles()) {
          return;
        }

        return this.addRolesToMember();
      }
      case "any":
        return this.memberHasEveryRoleInRoles()
          ? this.removeRolesFromMember()
          : this.addRolesToMember();
      case "unique":
      default:
        return this.memberHasEveryRoleInRoles()
          ? this.removeRolesFromMember()
          : this.setRolesToMember();
    }
  }
};
