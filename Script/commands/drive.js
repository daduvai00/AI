
const axios = require('axios');

module.exports.config = {
  name: "drive",
  version: "0.0.2", // Version updated
  hasPermission: 2,
  credits: "ArYAN",
  description: "Upload video or media to Google Drive and return shareable URL.",
  commandCategory: "utility",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  let inputUrl = null;

  // Get the URL from replied message or from args
  if (event.messageReply?.attachments?.length > 0) {
    inputUrl = event.messageReply.attachments[0].url;
  } else if (args.length > 0) {
    inputUrl = args[0];
  }

  // Check if an input URL is provided
  if (!inputUrl) {
    return api.sendMessage(
      "❌ | Please reply to a media message or provide a valid media URL.",
      event.threadID,
      event.messageID
    );
  }

  try {
    const apiURL = `https://web-api-delta.vercel.app/drive?url=${encodeURIComponent(inputUrl)}`;
    
    // Making a GET request to upload the file
    const res = await axios.get(apiURL);
    const data = res.data || {};
    
    // Check if the response has a valid drive link
    const driveLink = data.driveLink || data.driveLIink;
    if (driveLink) {
      const successMsg = `✅ File uploaded to Google Drive successfully!\n\n🔗 Drive URL: ${driveLink}`;
      return api.sendMessage(successMsg, event.threadID, event.messageID);
    }

    // Handle case where upload fails
    return api.sendMessage(
      `❌ | Failed to upload the file.\n${data.error || "No additional information available."}`,
      event.threadID,
      event.messageID
    );
  } catch (error) {
    console.error("Google Drive Upload Error:", error); // Log full error for debugging
    return api.sendMessage(
      "❌ | An unexpected error occurred during upload. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};
```

