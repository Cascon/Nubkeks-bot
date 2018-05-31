const Discord = require(`discord.js`);
const search = require('youtube-search');
const ytdl = require('ytdl-core');

module.exports.run = async(bot, message, args) => {
  if (message.member.voiceChannel) {
    let joinChannel = message.guild.channels.find(`name`, "music");
    if(!joinChannel) return message.guild.channels.send("Can't find join channel");

    const connection = await message.member.voiceChannel.join();

    var opts = {
      maxResults: 1,
      key: 'AIzaSyAzIP2Iuby2lMuJELiugUF8NtOe2DFu0kw'
    };

    search(args.join(' '), opts, function(err, results) {
      if(err) return console.log(err);

      joinChannel.send(`Song now playing: ${results[0].title}`);

      connection.playStream(ytdl(
        `${results[0].link}`,
        {filter: 'audioonly'}
      ));
      connection.on('finish', () => {
        connection.leave();
      });
    });
  } else {
    message.reply('You need to join a voice channel first!');
  }
}

module.exports.help = {
	name :"join"
}
