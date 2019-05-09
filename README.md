# Discord Reaction Role Bot

A Discord bot that allows users to self-assign roles using reactions.

## Setup

1. Adapt and follow the steps found in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).
2. Navigate to [src/config.js](https://github.com/peterthehan/discord-reaction-role-bot/blob/master/src/config.js) and add:

```js
models: {
  'MESSAGE_ID': {
    channelId: 'CHANNEL_ID',
    isUnique: true,
    emojiRoleMap: {
      'EMOJI_1': ['ROLE_1_ID'],
      'EMOJI_2': ['ROLE_2_ID'],
      'EMOJI_3': ['ROLE_3_ID', 'ROLE_4_ID']
    }
  },
  ...Add as many MESSAGE_ID keys as you want.
}
```

> If `isUnique` is true, the user can only have one emoji-role group at a time. If `isUnique` is false, the user can receive all emoji-roles.
> As seen in `EMOJI_3`, an emoji can map to multiple roles.
