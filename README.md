# Discord Reaction Role Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that allows users to self-assign roles using reactions.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/discord-reaction-role-bot/reactionRole.gif" />
</div>

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Roles` permission!

2. Download this widget and add it into the [src/widgets](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder.

3. Open [config.json](https://github.com/peterthehan/discord-reaction-role-bot/blob/master/config.json) to configure your own settings:

```
[
  {
    "messageId": "MESSAGE_ID",
    "channelId": "TEXT_CHANNEL_ID",
    "removeReaction": true,
    "policy": "unique",
    "emojiRoleMap": {
      "EMOJI_1": ["ROLE_1_ID"],
      "EMOJI_2": ["ROLE_2_ID"],
      "EMOJI_3": ["ROLE_3_ID", "ROLE_4_ID", "ROLE_5_ID"],
      // ...Add as many emoji-role mappings as you want.
      // Note: an emoji can map to multiple roles.
    }
  },
  // ...Add as many rules as you want.
]
```

- `messageId` is the message you want to the bot to create reaction roles for.

- `channelId` is the text channel the message is in.

- `removeReaction` determines whether the user reaction is removed (`true`) or not (`false`).

- `policy` **must** be one of the following strings:

  - `once`: User is only allowed to react and claim roles once. Subsequent reactions are ignored.
  - `any`: User can react and claim as many roles as they want.
  - `unique` (default): User can react and claim only one emoji's set of roles at a time.

- `EMOJI` can be:

  - A unicode emoji. https://emojipedia.org is a good reference to copy and paste from.

  ```
  "emojiRoleMap": {
    "😳": ["ROLE_1_ID"],
    "🥺": ["ROLE_2_ID"]
  }
  ```

  - An emoji ID for custom emojis. You can get a custom emoji's ID by sending `\:YourCustomEmoji:` in chat (prefix a backslash `\` character in front of your desired emoji).

  ```
  "emojiRoleMap": {
    "716344914706694165": ["ROLE_1_ID"],
    "622635442013208589": ["ROLE_2_ID"]
  }
  ```

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
