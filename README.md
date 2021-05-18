# Discord Reaction Role Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that allows users to self-assign roles using reactions.

<div align="center">
  <img
    src="https://raw.githubusercontent.com/peterthehan/discord-reaction-role-bot/master/assets/demo.gif"
    alt="demo"
  />
</div>

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Roles` permission!

2. Download this widget and move the `src-discord-reaction-role-bot` folder into the [src/widgets/](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder created in step 1.

3. Open [config.json](https://github.com/peterthehan/discord-reaction-role-bot/blob/master/config.json) to configure your own settings:

   ```json
   [
     {
       "messageId": "781290775265804288",
       "channelId": "258314939998011393",
       "removeReaction": true,
       "policy": "unique",
       "emojiRoleMap": {
         "🎉": ["542138999511187486"]
       }
     }
   ]
   ```

   Add as many rules as you want to configure for other servers.

   - `messageId` is the message you want the bot to react to for your reaction roles.
   - `channelId` is the text channel the message is in.
   - `removeReaction` determines whether the user reaction is removed (`true`) or not (`false`).
   - `policy` **must** be one of the following strings:

     - `once`: User is only allowed to react and claim roles once. Subsequent reactions are ignored.
     - `any`: User can react and claim as many roles as they want.
     - `unique` (default): User can react and claim only one emoji's set of roles at a time.

   - `emojiRoleMap` is a key-value map between emoji and role ids. An emoji can be:

     - A unicode emoji. https://emojipedia.org is a good reference to copy and paste from.

       ```json
         "emojiRoleMap": {
           "😳": ["ROLE_1_ID"],
           "🥺": ["ROLE_2_ID"]
         }
       ```

     - An emoji ID for custom emojis. You can get a custom emoji's ID by sending `\:YourCustomEmoji:` in chat (prefix a backslash `\` character in front of your desired emoji).

       ```json
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
