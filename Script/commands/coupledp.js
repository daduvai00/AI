const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/exe/main/baseApiUrl.json");
  return base.data.mahmud;
};

module.exports.config = {
  name: "coupledp",
  aliases: ["cdp", "cpldp", "couplepp"],
  version: "8.0.0",
  credits: "const axios = require("axios");

    const baseApiUrl = async () => {
      const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/exe/main/baseApiUrl.json");
      return base.data.mahmud;
    };

    module.exports.config = {
      name: "coupledp",
      aliases: ["cdp", "cpldp", "couple"],
      version: "8.0.0",
      credits: "TOHI-BOT-HUB",
      cooldowns: 0,
      hasPermssion: 0,
      description: "Fetch a random couple DP (male & female)",
      commandCategory: "image",
      category: "image",
      usePrefix: true,
      prefix: true
    };

    module.exports.run = async function ({ message }) {
      try {
        const apiBase = await baseApiUrl();
        const response = await axios.get(`${apiBase}/api/cdp2`, {
          headers: {
            "author": "const axios = require("axios");

              const baseApiUrl = async () => {
                const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/exe/main/baseApiUrl.json");
                return base.data.mahmud;
              };

              module.exports.config = {
                name: "coupledp",
                aliases: ["cdp", "cpldp", "couple"],
                version: "8.0.0",
                credits: "TOHI-BOT-HUB",
                cooldowns: 0,
                hasPermssion: 0,
                description: "Fetch a random couple DP (male & female)",
                commandCategory: "image",
                category: "image",
                usePrefix: true,
                prefix: true
              };

              module.exports.run = async function ({ message }) {
                try {
                  const apiBase = await baseApiUrl();
                  const response = await axios.get(`${apiBase}/api/cdp2`, {
                    headers: {
                      "author": "TOHI-BOT-HUB"
                    }
                  });

                  if (response.data.error)
                    return message.reply(response.data.error);

                  const { male, female } = response.data;
                  if (!male || !female)
                    return message.reply("Couldn't fetch couple DP. Try again later.");

                  const attachments = [
                    await global.utils.getStreamFromURL(male),
                    await global.utils.getStreamFromURL(female)
                  ];

                  await message.reply({
                    body: "Here is your couple DP 🥰",
                    attachment: attachments
                  });

                } catch (err) {
                  console.error(err);
                  message.reply("Error fetching couple DP. Please try again later.");
                }
              };
"
          }
        });

        if (response.data.error)
          return message.reply(response.data.error);

        const { male, female } = response.data;
        if (!male || !female)
          return message.reply("Couldn't fetch couple DP. Try again later.");

        const attachments = [
          await global.utils.getStreamFromURL(male),
          await global.utils.getStreamFromURL(female)
        ];

        await message.reply({
          body: "Here is your couple DP 🥰",
          attachment: attachments
        });

      } catch (err) {
        console.error(err);
        message.reply("Error fetching couple DP. Please try again later.");
      }
    };
",
  cooldowns: 0,
  hasPermssion: 0,
  description: "Fetch a random couple DP (male & female)",
  commandCategory: "image",
  category: "image",
  usePrefix: true,
  prefix: true
};

module.exports.run = async function ({ message }) {
  try {
    const apiBase = await baseApiUrl();
    const response = await axios.get(`${apiBase}/api/cdp2`, {
      headers: {
        "author": "TOHI-BOT-HUB"
      }
    });

    if (response.data.error)
      return message.reply(response.data.error);

    const { male, female } = response.data;
    if (!male || !female)
      return message.reply("Couldn't fetch couple DP. Try again later.");

    const attachments = [
      await global.utils.getStreamFromURL(male),
      await global.utils.getStreamFromURL(female)
    ];

    await message.reply({
      body: "Here is your couple DP 🥰",
      attachment: attachments
    });

  } catch (err) {
    console.error(err);
    message.reply("Error fetching couple DP. Please try again later.");
  }
};
