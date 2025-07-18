const { getData, setData } = require("../includes/data.sqlite"); // ✅ তোমার Users module এখানে adjust করো

module.exports.config = {
  name: "busy",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "TOHI-BOT-HUB (Modified by Tohidul)",
  description: "⛔ Set busy mode to auto-reply when mentioned",
  commandCategory: "👤 User",
  usages: "[reason] or off",
  cooldowns: 3,
  usePrefix: true
};

module.exports.run = async function ({ api, event, args }) {
  const { senderID, threadID, messageID } = event;
  try {
    if (args[0] && args[0].toLowerCase() === "off") {
      await setData(senderID, { busy: false });
      return api.sendMessage("✅ 𝐁𝐮𝐬𝐲 𝐌𝐨𝐝𝐞 বন্ধ হয়েছে", threadID, messageID);
    }

    const reason = args.join(" ");
    const busyData = reason || true;
    await setData(senderID, { busy: busyData });

    let userName = "";
    try {
      const userInfo = await api.getUserInfo(senderID);
      if (userInfo && userInfo[senderID]?.name) {
        userName = userInfo[senderID].name;
      }
    } catch {}

    if (!userName) userName = `User-${senderID.slice(-6)}`;

    const successMessage = reason
      ? `✅ 𝐁𝐮𝐬𝐲 𝐌𝐨𝐝𝐞 চালু হয়েছে\n📝 কারণ: ${reason}\n🔓 বন্ধ করতে: /busy off`
      : `✅ 𝐁𝐮𝐬𝐲 𝐌𝐨𝐝𝐞 চালু হয়েছে\n🔓 বন্ধ করতে: /busy off`;

    return api.sendMessage(successMessage, threadID, messageID);
  } catch (error) {
    console.error("Busy command error:", error);
    return api.sendMessage("❌ Error setting busy mode", threadID, messageID);
  }
};

module.exports.handleEvent = async function ({ api, event }) {
  const { type, threadID, mentions } = event;
  if (type !== "message" && type !== "message_reply") return;

  if (mentions && Object.keys(mentions).length > 0) {
    for (const userID of Object.keys(mentions)) {
      try {
        const userData = await getData(userID);
        if (userData && userData.busy) {
          let userName = "";
          try {
            const userInfo = await api.getUserInfo(userID);
            if (userInfo && userInfo[userID]?.name) {
              userName = userInfo[userID].name;
            }
          } catch {}

          if (!userName) userName = `User-${userID.slice(-6)}`;
          const busyReason = typeof userData.busy === "string" ? userData.busy : "Busy";
          const busyMessage = `🔴 ${userName} এখন Busy আছে\n📝 কারণ: ${busyReason}`;
          api.sendMessage(busyMessage, threadID);
        }
      } catch {}
    }
  }
};
