const fs = require("fs-extra");
const pathFile = __dirname + "/cache/autoseen.txt";

// ✅ বট চালু হলে autoseen সিস্টেম অটো চালু হবে (true)
fs.writeFileSync(pathFile, "true");

module.exports.config = {
  name: "autoseen",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Tohidul",
  description: "Auto seen system on/off",
  commandCategory: "tools",
  usages: "on/off",
  cooldowns: 5
};

// কারো মেসেজ আসলে যদি autoseen 'on' থাকে, তাহলে seen করে দিবে
module.exports.handleEvent = async ({ api, event }) => {
  try {
    const status = fs.readFileSync(pathFile, "utf-8");
    if (status.trim() === "true") {
      api.markAsReadAll(() => {});
    }
  } catch (e) {
    console.error("❌ AutoSeen Error:", e);
  }
};

// autoseen on/off command
module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  try {
    if (args[0] === "on") {
      fs.writeFileSync(pathFile, "true");
      api.sendMessage("✅ AutoSeen has been turned **ON**.", threadID, messageID);
    } else if (args[0] === "off") {
      fs.writeFileSync(pathFile, "false");
      api.sendMessage("❌ AutoSeen has been turned **OFF**.", threadID, messageID);
    } else {
      api.sendMessage(
        `⚠️ Wrong format!\n👉 Use: ${global.config.PREFIX}${this.config.name} ${this.config.usages}`,
        threadID,
        messageID
      );
    }
  } catch (e) {
    console.error("❌ Command Error:", e);
    api.sendMessage("❌ An error occurred while running the command.", threadID, messageID);
  }
};
