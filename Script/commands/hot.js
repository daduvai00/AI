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
  
  // Random video links array
  const link = [
    "https://i.imgur.com/bumoLaZ.mp4",
    "https://i.imgur.com/anotherVideo.mp4" // Add more video links as needed
  ];

  // Function to send the video
  const sendVideo = () => {
    api.sendMessage({
      body: `╭──────•◈•───────╮\n    𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,
      attachment: fs.createReadStream(__dirname + "/cache/1.mp4")
    }, event.threadID, () => {
      fs.unlinkSync(__dirname + "/cache/1.mp4"); // Clean up the file after sending
    });
  };

  // Select a random video link
  const randomLink = link[Math.floor(Math.random() * link.length)];

  // Download the video and send it
  request(encodeURI(randomLink))
    .pipe(fs.createWriteStream(__dirname + "/cache/1.mp4"))
    .on("close", sendVideo)
    .on("error", (err) => {
      console.error("Error downloading the video:", err);
      api.sendMessage("Sorry, there was an error fetching the video.", event.threadID);
    });
};
```
