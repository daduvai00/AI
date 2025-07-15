TâMïMconst fs = require("fs-extra");
const axios = require("axios");
const request = require("request");

module.exports.config = {
  name: "helpall",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "ULLASH ON",
  description: "help command list",
  commandCategory: "system",
  usages: "",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  en: {
    moduleInfo: "🄸🅂🅃✿\n\n❄️ Prefix: %1\n❄️ Name: %2\n❄️ Description: %3\n❄️ Usage: %4\n❄️ Permission: %5\n❄️ Time: %6s",
    helpList: "[There are %1 commands]\n\n",
    user: "User",
    adminGroup: "Admin group",
    adminBot: "Admin bot"
  }
};

module.exports.handleEvent = function({ api, event, getText }) {
  const { threadID, messageID, body } = event;
  if (!body || typeof body != "string" || body.indexOf("help") != 0) return;

  const input = body.slice(body.indexOf("help")).trim().split(/\s+/);
  const commandName = input[1]?.toLowerCase();
  const command = global.client.commands.get(commandName);

  if (!command) return;

  const config = command.config;
  const perm = config.hasPermssion == 0 ? getText("user")
             : config.hasPermssion == 1 ? getText("adminGroup")
             : getText("adminBot");

  const msg = getText(
    "moduleInfo",
    global.config.PREFIX,
    config.name,
    config.description,
    config.usages,
    perm,
    config.cooldowns
  );

  return api.sendMessage({ body: msg }, threadID, messageID);
};

module.exports.run = function({ api, event, args, getText }) {
  const { threadID, messageID } = event;
  const commands = global.client.commands;
  const command = commands.get((args[0] || "").toLowerCase());

  if (!command) {
    const commandNames = [];
    for (const [name] of commands) commandNames.push(name);

    commandNames.sort((a, b) => a.length - b.length);
    const page = parseInt(args[0]) || 1;
    const limit = 20;
    const totalPages = Math.ceil(commandNames.length / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageList = commandNames.slice(start, end).map(cmd => `• ${cmd}`).join("\n");

    const msg = `📛 PAGE: ${page}/${totalPages}\n\n${pageList}\n\n𝗯𝘆 |•—» TâMïM ッ «—\n\nUse: "${global.config.PREFIX}help commandName" to see details`;
    return api.sendMessage(msg, threadID, messageID);
  }

  const config = command.config;
  const perm = config.hasPermssion == 0 ? getText("user")
             : config.hasPermssion == 1 ? getText("adminGroup")
             : getText("adminBot");

  const msg = getText(
    "moduleInfo",
    global.config.PREFIX,
    config.name,
    config.description,
    config.usages,
    perm,
    config.cooldowns
  );

  return api.sendMessage({ body: msg + `\n\n𝗯𝘆 |•—» TâMïM ッ «—` }, threadID, messageID);
};
