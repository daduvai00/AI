const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

const videoLinks = [
    "https://i.imgur.com/Fuhfezs.mp4"
];

module.exports.config = {
    name: "tamim",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Islamick Chat, @Tamim Khan",
    description: "Auto reply to specific trigger phrase",
    commandCategory: "noprefix",
    usages: "tamim",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.handleEvent = async ({ api, event }) => {
    const content = event.body ? event.body.toLowerCase() : '';
    if (content.startsWith("tamim")) {
        const senderName = (await api.getUserInfo(event.senderID))[event.senderID].name;
        const responses = [
            `╭•┄┅════❁🌺❁════┅┄•╮\n\n ${senderName}, তামিম বস বিজি আছে, যা বলবে আমাকে বলো-!!\n\n╰•┄┅════❁🌺❁════┅┄•╯`,
            `╭•┄┅════❁🌺❁════┅┄•╮\n\n ${senderName}, তামিম বস বিজি আছে, যা বলবে আমাকে বলো-!!\n\n╰•┄┅════❁🌺❁════┅┄•╯`
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        const videoLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];

        const callback = () => api.sendMessage({
            body: response,
            attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);

        const requestStream = request(encodeURI(videoLink));
        requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", callback);
    }
};

module.exports.languages = {
    "vi": {
        "on": "Dùng sai cách rồi lêu lêu",
        "off": "sv ngu, đã bão dùng sai cách",
        "successText": "🧠"
    },
    "en": {
        "on": "on",
        "off": "off",
        "successText": "success!"
    }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
    const { threadID, messageID } = event;
    let data = (await Threads.getData(threadID)).data || {};
    
    if (typeof data["tamim"] === "undefined" || data["tamim"]) {
        data["tamim"] = false;
    } else {
        data["tamim"] = true;
    }

    await Threads.setData(threadID, { data });
    global.data.threadData.set(threadID, data);
    api.sendMessage(`${data["tamim"] ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
