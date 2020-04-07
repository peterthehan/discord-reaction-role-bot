# Discord Reaction Role Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Ko-fi](https://img.shields.io/badge/donate-Ko--fi-29ABE0.svg)](https://ko-fi.com/peterthehan) [![Patreon](https://img.shields.io/badge/donate-Patreon-F96854.svg)](https://www.patreon.com/bePatron?u=33175931) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that allows users to self-assign roles using reactions.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-reaction-role-bot/reactionRole.gif" />
</div>

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

> Don't forget to give your bot the `Manage Roles` permission!

2. Download this widget and move it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/blob/master/src/widgets/) folder.

3. Open [config.js](https://github.com/peterthehan/discord-reaction-role-bot/blob/master/config.js) to configure your own settings:

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

> An emoji can map to multiple roles as seen in `EMOJI_3` above.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
