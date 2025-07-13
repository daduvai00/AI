const fs = require('fs-extra');
const pathFile = __dirname + '/cache/autoseen.txt';

// ফাইল চেক এবং ডিফল্ট মান সেট করা
if (!fs.existsSync(pathFile)) fs.writeFileSync(pathFile, 'true');

module.exports = {
    name: 'autoseen',
    version: '1.0.0',
    hasPermssion: 2,
    credits: '𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭',
    description: 'Auto seen',
    commandCategory: 'tools',
    usages: 'on/off',
    cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
    // সবসময় সিন করার জন্য এখানে ফাইল চেক করা হচ্ছে
    const autoSeenStatus = fs.readFileSync(pathFile, 'utf-8').trim();

    if (autoSeenStatus === 'true') {
        api.markAsReadAll(() => {});
    }
};

module.exports.run = async ({ api, event, args }) => {
    const pathFile = __dirname + '/cache/autoseen.txt';
    try {
        if (args[0] === 'on') {
            fs.writeFileSync(pathFile, 'true');
            api.sendMessage('Auto seen turned on successfully.', event.threadID, event.messageID);
        } else if (args[0] === 'off') {
            fs.writeFileSync(pathFile, 'false');
            api.sendMessage('Auto seen turned off successfully.', event.threadID, event.messageID);
        } else {
            api.sendMessage('Incorrect format\nUse: on/off', event.threadID, event.messageID);
        }
    } catch (error) {
        console.log(error);
    }
};
```
