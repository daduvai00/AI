module.exports.config = {
    name: "hot",
    version: "1.1.0",
    hasPermission: 2,
    credits: "RAJA ViP 5X",
    description: "RANDOM items video",
    commandCategory: "Random video",
    usages: "Statusvideo",
    cooldowns: 2,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];

    const links = [
        "https://i.imgur.com/bumoLaZ.mp4",
        // Add more video links here
    ];

    const selectedLink = links[Math.floor(Math.random() * links.length)];
    
    // File path
    const filePath = `${__dirname}/cache/1.mp4`;

    try {
        const response = await axios.get(selectedLink, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({
                body: `╭──────•◈•───────╮\n  𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => fs.unlinkSync(filePath));
        });

        writer.on('error', (error) => {
            console.error("Error writing to file:", error);
            api.sendMessage("Failed to download video. Please try again later.", event.threadID);
        });

    } catch (error) {
        console.error("Error fetching video:", error);
        api.sendMessage("Failed to fetch video. Please try again later.", event.threadID);
    }
};
```
