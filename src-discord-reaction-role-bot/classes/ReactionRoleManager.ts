import { GuildMember, MessageReaction, Snowflake, User } from "discord.js";
import { Config } from "../types";

class ReactionRoleManager {
  messageReaction: MessageReaction;
  user: User;
  config: Config;
  roleIds?: Snowflake[];
  member?: GuildMember;

  constructor(messageReaction: MessageReaction, user: User, config: Config) {
    this.messageReaction = messageReaction;
    this.user = user;
    this.config = config;
    this.roleIds = undefined;
    this.member = undefined;
  }

  get emoji(): string {
    return (this.messageReaction.emoji.id ||
      this.messageReaction.emoji.name) as string;
  }

  get ruleRoleIds(): Snowflake[] {
    return [...new Set(Object.values(this.config.emojiRoleMap).flat())];
  }

  async setRoles(): Promise<void> {
    if (!(await this._validateInput())) {
      return;
    }

    await this._handleUserReaction();

    switch (this.config.policy) {
      case "once":
        return this._memberHasSomeRoleInRuleRoles()
          ? undefined
          : this._addRolesToMember();
      case "any":
        return this._memberHasEveryRoleInRoles()
          ? this._removeRolesFromMember()
          : this._addRolesToMember();
      case "unique":
      default:
        return this._memberHasEveryRoleInRoles()
          ? this._removeRolesFromMember()
          : this._setRolesToMember();
    }
  }

  private async _validateInput(): Promise<boolean> {
    if (
      !this.config ||
      this.user.bot ||
      this.messageReaction.message.channel.type === "DM"
    ) {
      return false;
    }

    if (!this._setRoleIds() || !(await this._setMember())) {
      return false;
    }

    return true;
  }

  private _setRoleIds(): boolean {
    this.roleIds = this.config.emojiRoleMap[this.emoji];

    return Boolean(this.roleIds);
  }

  private async _setMember(): Promise<boolean> {
    this.member = await this.messageReaction.message.guild?.members.fetch(
      this.user
    );

    return Boolean(this.member);
  }

  private async _handleUserReaction(): Promise<void> {
    if (this.config.removeReaction) {
      this.messageReaction.users.remove(this.user);
    }
  }

  private _memberHasSomeRoleInRuleRoles(): boolean {
    return this.ruleRoleIds.some((roleId) =>
      (this.member as GuildMember).roles.cache.has(roleId)
    );
  }

  private _memberHasEveryRoleInRoles(): boolean {
    return (this.roleIds as Snowflake[]).every((roleId) =>
      (this.member as GuildMember).roles.cache.has(roleId)
    );
  }

  private async _removeRolesFromMember(): Promise<void> {
    (this.member as GuildMember).roles.remove(this.roleIds as Snowflake[]);
  }

  private async _addRolesToMember(): Promise<void> {
    (this.member as GuildMember).roles.add(this.roleIds as Snowflake[]);
  }

  private async _setRolesToMember(): Promise<void> {
    const currentRoleIds = (this.member as GuildMember).roles.cache.map(
      (role) => role.id
    );
    const roleIdsToSet = [
      ...currentRoleIds.filter((roleId) => !this.ruleRoleIds.includes(roleId)),
      ...(this.roleIds as Snowflake[]),
    ];

    (this.member as GuildMember).roles.set(roleIdsToSet);
  }
}

export { ReactionRoleManager };
