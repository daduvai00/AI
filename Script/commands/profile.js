module.exports = {
config: {
name: "profile",
version: "1.0.0",
usePrefix: true,
hasPermssion: 0,
credits: "TOHIDUL",
description: "Share profile contact with the mentioned user or specified username.",
commandCategory: "admin",
usages: "[username | reply to a message]",
cooldowns: 5,
},

run: async ({ api, event }) => {
const { shareContact } = api;
const { threadID, messageReply, senderID, mentions, type } = event;

// Check if a mention exists, or if a username is provided, otherwise default to senderID
let id;
if (Object.keys(mentions).length > 0) {
id = Object.keys(mentions)[0].replace(/\&mibextid=ZbWKwL/g, '');
} else if (args[0] !== undefined) {
id = isNaN(args[0]) ? await global.utils.getUID(args[0]) : args[0];
} else {
id = senderID;
}

// If the type is message_reply, use the senderID from the replied message
if (type === "message_reply") {
id = messageReply.senderID;
}

// Share the contact
shareContact("", id, threadID);
}
};
```
