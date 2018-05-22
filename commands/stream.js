const Discord = require("discord.js");
const request = require("request");

// const nubLive = "https://api.twitch.tv/kraken/streams/nubkeks?client_id=wgmissje9l67nel3xwxurzureger8k";

module.exports.run = async(bot, message, args) => {
  request ({
    url: 'https://api.twitch.tv/kraken/streams/nubkeks?client_id=wgmissje9l67nel3xwxurzureger8k',
    json: true
  }, (error, response, body) => {
    try {
    if (!error && response.body.stream !== null) {
      return message.channel.send("Nubkeks is currently live over at https://www.twitch.tv/nubkeks");
    } else if (response.body.stream === null){
      return message.channel.send("Stream is not currently live. Most weekdays (Monday-Friday) Nubkeks will be streaming at 1pm CEST | 6am PT for a good few hours ----- Nubkeks also streams every Friday at 10pm GMT | 3pm PT on the TGN Squadron youtube channel! ");
    }
  } catch (error) {
    console.log(error);
  }
  });
};

module.exports.help = {
	name: "stream"
}
