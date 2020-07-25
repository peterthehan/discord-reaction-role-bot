# Discord Reaction Role Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan) [![Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-F16061.svg?logo=ko-fi)](https://ko-fi.com/peterthehan) [![Patreon](https://img.shields.io/badge/Donate-Patreon-F96854.svg?logo=patreon)](https://www.patreon.com/peterthehan)

A Discord bot that allows users to self-assign roles using reactions.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-reaction-role-bot/reactionRole.gif" />
</div>

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

> Don't forget to give your bot the `Manage Roles` permission!

2. Download this widget and add it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder.

3. Open [config.json](https://github.com/peterthehan/discord-reaction-role-bot/blob/master/config.json) to configure your own settings:

```js
[
  {
    "messageId": "MESSAGE_ID",
    "channelId": "TEXT_CHANNEL_ID",
    "isUnique": true,
    "emojiRoleMap": {
      "EMOJI_1": ["ROLE_1_ID"],
      "EMOJI_2": ["ROLE_2_ID"],
      "EMOJI_3": ["ROLE_3_ID", "ROLE_4_ID"],
      // ...Add as many emoji-role mappings as you want.
    }
  },
  // ...Add as many rules as you want.
]
```

> If `isUnique` is `true`, the user can select only one role group at a time (gif above). If `false`, the user can select as many role groups as they want.

> `EMOJI_N` can be a unicode emoji or an emoji id for custom emojis.

> An emoji can map to multiple roles as seen in `EMOJI_3` above.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
