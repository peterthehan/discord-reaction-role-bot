# Discord Reaction Role Bot

A Discord bot that allows users to self-assign roles using reactions.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/discord-reaction-role-bot/master/assets/reactionRole.gif" />
</div>

## Setup

1. Adapt and follow the steps found in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

> Don't forget to give your bot the `Manage Roles` permission!

2. Open [src/config.js](https://github.com/peterthehan/discord-reaction-role-bot/blob/master/src/config.js) to configure your own settings:

```js
rules: {
  'MESSAGE_ID': {
    channelId: 'CHANNEL_ID',
    isUnique: true,
    emojiRoleMap: {
      'EMOJI_1': ['ROLE_1_ID'],
      'EMOJI_2': ['ROLE_2_ID'],
      'EMOJI_3': ['ROLE_3_ID', 'ROLE_4_ID'],
      // ...Add as many emoji-role mappings as you want.
    }
  },
  // ...Add as many rules as you want.
}
```

> If `isUnique` is `true`, the user can select only one role group at a time (gif above).

> If `isUnique` is `false`, the user can select as many role groups as they want.

> `EMOJI` can be the unicode value for default emojis or the emoji id for custom emojis.

> An emoji can map to multiple roles (`EMOJI_3` above).

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
