const Discord = require(`discord.js`);
const request = require("request");

module.exports.run = async(bot, message, args) => {
  let raidChannel = message.guild.channels.find(`name`, "raidlist");
  if(!raidChannel) return message.channel.send("Can't find raid list Channel");

  request ({
    url: 'https://eu.api.battle.net/wow/guild/Argent%20Dawn/The%20Order%20Reforged?fields=members&locale=en_GB&apikey=xf4ayd4j7dhsvzwv8n2r8b3ymdhutzs2',
    json: true
  }, (error, response, body) => {
    var raidNameList = [];
    for (var i = 0; i < response.body.members.length; i++) {
      if (response.body.members[i].rank <= 3) {
        raidNameList.push(response.body.members[i].character.name);
      }
    }
    raidChannel.send(raidNameList);
  });
  return;
}

module.exports.help = {
	name : "raidList"
}
