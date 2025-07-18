module.exports.config = {
name: "all",
version: "1.0.0",
hasPermssion: 0,
credits: "TOHI-BOT-HUB",
description: "সকল গ্রুপ মেম্বারকে ট্যাগ করুন (everyone mention)",
commandCategory: "group",
usages: "/all [message] বা /all",
cooldowns: 5,
usePrefix: true,
};

module.exports.run = async function({ api, event, args }) {
try {
// Group member fetch
const threadInfo = await api.getThreadInfo(event.threadID);
const members = threadInfo.participantIDs.filter(uid => uid != api.getCurrentUserID());

// Custom message or default
let msg = args.length > 0 ? args.join(" ") : "👋 𝙀𝙫𝙚𝙧𝙮𝙤𝙣𝙚!";

// Mentions array build
for (let uid of members) {
await api.sendMessage({
body: msg,
mentions: [{
tag: "★", // will be replaced by the name of the mentioned user
id: uid
}]
}, event.threadID);

// Delay of 1 second
await new Promise(resolve => setTimeout(resolve, 1000));
}
} catch (e) {
api.sendMessage("❌ সবাইকে ট্যাগ করতে সমস্যা হয়েছে!\n" + e, event.threadID, event.messageID);
}
};
```
