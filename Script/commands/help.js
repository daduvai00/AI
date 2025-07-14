module.exports.config = {
    name: "help",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "FREE SET-UP MESSENGER",
    commandCategory: "system",
    usages: "[Name module]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
 "en": {
    "moduleInfo": "🟢 **Module Info** 🟢\n\n📜 𝗡𝗮𝗺𝗲: **%1**\n🔍 𝗨𝘀𝗮𝗴𝗲: %3\n📖 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n📅 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n⏳ 𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 seconds(s)\n🔒 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n🛠️ 𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆: Ullash ッ",
    "helpList": '📚 **Total Commands: %1** - Use: "%2help nameCommand" for details!',
    "user": "User",
    "adminGroup": "Admin group",
    "adminBot": "Admin bot"
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
 return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot"))), command.config.credits), threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (args[0] == "all") {
      const commandArr = commands.values();
      let group = [], msg = "";
      commandArr.forEach(cmd => {
          const category = cmd.config.commandCategory.toLowerCase();
          if (!group.some(item => item.group == category)) {
              group.push({ group: category, cmds: [cmd.config.name] });
          } else {
              group.find(item => item.group == category).cmds.push(cmd.config.name);
          }
      });

      group.forEach(commandGroup => msg += `🌟 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}\n🔑 ${commandGroup.cmds.join(' • ')}\n\n`);

      // Random image selection
      const imgUrl = ['https://link-to-your-image-1', 'https://link-to-your-image-2'];
      var callback = () => api.sendMessage({
          body:`✨ **Command List** ✨\n\n${msg}\n📝 Use ${prefix}help [Name] for detailed info.\n👤 Owner: Ullash ッ\n📊 Total Commands: ${commands.size}\n`,
          attachment: fs.createReadStream(__dirname + "/path-to-your-image.jpg")
      }, threadID, event.messageID);
      return request(encodeURI(imgUrl[Math.floor(Math.random() * imgUrl.length)])).pipe(fs.createWriteStream(__dirname + "/cache/your-image.jpg")).on("close", callback);
  }

  if (!command) {
      const arrayInfo = Array.from(commands.keys());
      const page = parseInt(args[0]) || 1;
      const numberOfOnePage = 15;
      const first = numberOfOnePage * page - numberOfOnePage;
      const helpView = arrayInfo.slice(first, first + numberOfOnePage);
      let msg = helpView.map(cmd => `•[ ${cmd} ]`).join('\n');

      const totalMsg = `📋 **Commands List**\n\n${msg}\n\nUsage: ${prefix}help [Name]\nPage: [${page}/${Math.ceil(arrayInfo.length / numberOfOnePage)}]\nTotal Commands: [${arrayInfo.length}]`;

      return api.sendMessage(totalMsg, threadID, messageID);
  }

  const moduleInfo = getText("moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
      command.config.commandCategory,
      command.config.cooldowns,
      ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")),
      command.config.credits
  );

  const imgUrl = ['https://link-to-your-image-3', 'https://link-to-your-image-4'];
  request(encodeURI(imgUrl[Math.floor(Math.random() * imgUrl.length)])).pipe(fs.createWriteStream(__dirname + "/cache/your-image.jpg")).on("close", () => {
      api.sendMessage({ body: moduleInfo, attachment: fs.createReadStream(__dirname + "/cache/your-image.jpg") }, threadID, () => fs.unlinkSync(__dirname + "/cache/your-image.jpg"), messageID);
  });
};
```

