const Discord = require(`discord.js`);
const search = require('youtube-search');

module.exports.run = async(bot, message, args) => {
  let videoChannel = message.guild.channels.find(`name`, "music");
  if(!videoChannel) return message.guild.channel.send("Can't find music channel");

  var opts = {
    maxResults: 1,
    key: 'AIzaSyAzIP2Iuby2lMuJELiugUF8NtOe2DFu0kw'
  };

  search(args.join(' '), opts, function(err, results) {
    if(err) return console.log(err);

    videoChannel.send(`Video Title: ${results[0].title} --- Video Link: ${results[0].link}`);
  });
}

module.exports.help = {
	name :"video"
}
