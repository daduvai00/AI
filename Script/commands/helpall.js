module.exports.config = {
name: "helpall",
version: "1.0.2",
hasPermssion: 1,
credits: "Shaon Ahmed",
description: "Beginner's Guide",
commandCategory: "SYSTEM",
usages: "[module name]",
cooldowns: 5,
envConfig: {
autoUnsend: true,
delayUnsend: 30
}
};

module.exports.languages = {
"vi": {
"moduleInfo": "⚜ %1 ⚜\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n⚔️ Module code by %7 ⚔️",
"helpList": '☠ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: %2help nameCommand" để xem chi tiết cách sử dụng! | Có gì thắc mắc hãy ib:\nFb Admin BoT: https://www.facebook.com/jahidhasanrajib500/ ☠\nPhần .help này sẽ tự thu hồi sau 30s"',
"user": "Người dùng",
"adminGroup": "Quản trị viên nhóm",
"adminBot": "Quản trị viên bot"
},
"en": {
"moduleInfo": "「 %1 」\n%2\n\n➤ 🌺 Usage: %3\n➤ 🌺 Category: %4\n➤ 🌺 Cool Down: %5 seconds(s)\n➤ 🌺 Permission: %6\n\n➤ 🌺 Module Coded by %7.",
"helpList": 'Currently %1 commands are available. Use: [ %2help command name ] to know how to use a particular command!',
"user": "User",
"adminGroup": "Group Admin",
"adminBot": "Bot Admin"
}
};

module.exports.handleEvent = function ({ api, event, getText }) {
const { commands } = global.client;
const { threadID, messageID, body } = event;

if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
const command = commands.get(splitBody[1].toLowerCase());
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = function({ api, event, args, getText }) {
const { commands } = global.client;
const { threadID, messageID } = event;
const command = commands.get((args[0] || "").toLowerCase());
const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
const { autoUnsend, delayUnsend } = this.config.envConfig;
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

if (!command) {
const commandList = commands.values();
var group = [], msg = "";

for (const commandConfig of commandList) {
const category = commandConfig.config.commandCategory.toLowerCase();
const existingGroup = group.find(item => item.group.toLowerCase() === category);

if (!existingGroup) {
group.push({ 
group: category, 
cmds: [commandConfig.config.name] 
});
} else {
existingGroup.cmds.push(commandConfig.config.name);
}
}

group.sort((a, b) => a.group.localeCompare(b.group));

group.forEach(commandGroup => {
msg += `╭•┄┅════❁ ${commandGroup.group.toUpperCase()} ❁════┅┄•╮\n`;
msg += `✨ ${commandGroup.cmds.join('\n✨ ')}\n`;
msg += `╰•┄┅════❁ ${commandGroup.group.toUpperCase()} ❁════┅┄•╯\n\n`;
});

return api.sendMessage({
body: msg + getText("helpList", commands.size, prefix),
threadID,
messageID
}, async (error, info) => {
if (autoUnsend) {
await new Promise(resolve => setTimeout(resolve, delayUnsend * 1000));
return api.unsendMessage(info.messageID);
}
});
}

return api.sendMessage(
getText(
"moduleInfo", 
command.config.name, 
command.config.description, 
`${prefix}${command.config.name} ${command.config.usages || ""}`, 
command.config.commandCategory, 
command.config.cooldowns, 
(
command.config.hasPermssion == 0 ? getText("user") : 
command.config.hasPermssion == 1 ? getText("adminGroup") : 
getText("adminBot")
), 
command.config.credits
), 
threadID, 
messageID
);
};
```
