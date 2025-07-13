module.exports.config = {
  name: "hot",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "RAJA ViP 5X",
  description: "Random items video",
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
  
  // Video links array
  const links = [
    "https://i.imgur.com/bumoLaZ.mp4", "https://xhamster.desi/best/weekly", "https://www.google.com/amp/s/amp.xhamster.com/12"// Add more links if necessary
  ];

  // Function to download video
  const downloadVideo = (url, filePath) => {
    return new Promise((resolve, reject) => {
      request.get(url)
        .pipe(fs.createWriteStream(filePath))
        .on("finish", resolve)
        .on("error", reject);
    });
  };

  // Setup file path for the video
  const filePath = __dirname + "/cache/1.mp4";
  const randomLink = links[Math.floor(Math.random() * links.length)];

  try {
    await downloadVideo(randomLink, filePath);
    // Send message with video attachment
    const bodyMessage = '╭──────•◈•───────╮\n      𝘏𝘖𝘛 𝘝𝘐𝘋𝘌𝘖\n╰──────•◈•───────╯';
    api.sendMessage({
      body: bodyMessage,
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => {
      fs.unlinkSync(filePath); // Clean up the cached file
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    api.sendMessage('কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন।', event.threadID);
  }
};
```
