const Discord = require("discord.js");
const request = require("request");
const schedule = require("node-schedule");

// Sets up the timer to auto run every 3 minutes (recommended time amount)
var announcementLoop = schedule.scheduleJob('* */3 * * * *', () => {
  module.exports.run = async(bot, message, args) => {
    // Request the JSON data from the Twitch API for nubs channel
    request ({
      url: 'https://api.twitch.tv/kraken/streams/nubkeks?client_id=wgmissje9l67nel3xwxurzureger8k',
      json: true
    }, (error, response, body) => {
      // Set the boolean variable
      var postedAnnouncement = false;
      if (!error && response.body.stream !== null && postedAnnouncement === false) {
        // Post announcement
        return message.channel.send("@here One and all nub is live over here! <:casconCringe:437671796284588032> :point_right: https://www.twitch.tv/nubkeks");
        // Set boolean to true when announcement has been posted to avoid repitition
        postedAnnouncement = true;
      } else if (response.body.stream === null && postedAnnouncement === true){
        // Set boolen to false when nub goes offline so as to allow for new announcement when he goes live
        postedAnnouncement = false;
      };
    });
  };
});

module.exports.help = {
	name: "twitchAnnouncement"
}
