
const fs = global.nodemodule["fs-extra"];
const moment = require("moment-timezone");

module.exports.config = {
  name: "Obot",
  version: "1.0.1",
  hasPermission: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

const responses = {
  missYou: "আমি তোমাকে রাইতে মিস খাই🥹🤖👅/👅-✘  🎀 🍒:))",
  emojiResponse: "🫠",
  help: "Type /help",
  sim: "simsimi কমান্ড এড় নাই টাইপ করুন baby",
  greetings: {
    "আসসালামু আলাইকুম": "ওয়ালাইকুমুস-সালাম-!!🖤",
    "morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚"
  },
  name: "MY NAME IS °_>Assistant AI",
  adminResponse: "He is TâMïM ッ❤️",
  botStatus: "My Creator:Tamim ❤️ হাই আমি মেছেন্জার ROBOT আামার বস আমাকে বানিয়েছেন আপনাদের কে হাসানোর জন্য আমি চাই আপনারা সব সময় হাসি খুশি থাকেন",
  sorry: "সরি বস মাফ করে দেন আর এমন ভুল হবে না🥺🙏",
  compliment: [
    "বেশি Bot Bot করলে leave নিবো কিন্তু😒😒",
    "তুমি কি আমাকে ভালোবাসো? 🙈💋"
  ],
  // Add other response categories as needed
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  const { threadID, messageID } = event;
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  const name = await Users.getNameUser(event.senderID);
  
  // Lowercase the event body for ease of matching
  const body = event.body.toLowerCase(); 

  // Simple checks for specific phrases
  if (body.includes("miss you")) {
    return api.sendMessage(responses.missYou, threadID);
  }
  
  if (body.includes("😒") || body.includes("😽")) {
    return api.sendMessage(responses.emojiResponse, threadID);
  }

  if (body.includes("help")) {
    return api.sendMessage(responses.help, threadID);
  }

  if (body.includes("তামিম") || body.includes("simsimi")) {
    return api.sendMessage("উনি এখন বিজি আছেন কী বলবেন আমাকে বলেন ", threadID);
  }

  if (responses.greetings[body]) {
    return api.sendMessage(responses.greetings[body], threadID);
  }

  if (body.includes("tor nam ki") || body.includes("name")) {
    return api.sendMessage(responses.name, threadID);
  }

  if (body.includes("admin") || body.includes("admin ke")) {
    return api.sendMessage(responses.adminResponse, threadID);
  }

  if (body.includes("kisser")) {
    return api.sendMessage("️ তুমি পঁচা তোমাকে কিস দিবো না 🤭", threadID);
  }

  // Add more specific responses...
  // Example general phrases or insults
  const angerResponses = [
    "️রাগ করে না সোনা পাখি এতো রাগ শরীরের জন্য ভালো না🥰",
    // additional responses can be added
  ];

  const badWordsResponses = responses.complaint; // Adjust as needed
  
  if (body.includes("bc") || body.includes("mc")) {
    return api.sendMessage("SAME TO YOU😊 ", threadID);
  }

  // Fallback response for unhandled cases
  const randomResponse = angryResponses[Math.floor(Math.random() * angryResponses.length)];
  return api.sendMessage(randomResponse, threadID);
};
```
