const botconfig = require ("./botconfig.json")
const Discord = require(`discord.js`);
const client = new Discord.Client();
const bot = new Discord.Client();
const fs = require("fs");
const request = require("request");
const schedule = require("node-schedule");
const rp = require('request-promise');
const cheerio = require('cheerio');
const antispam = require("discord-anti-spam");
const ytdl = require('ytdl-core');
const music = require('discord.js-musicbot-addon');
bot.commands = new Discord.Collection();

music.start(bot, {
  youtubeKey: "AIzaSyAzIP2Iuby2lMuJELiugUF8NtOe2DFu0kw",
  clearOnLeave: true,
  enableQueueStat: true,
  botAdmins: ["206537691066531840"],
  thumbnailType: "high"
});

var badWordsList = [
  'nigger',
	'nigga',
	'coon',
	'nazi',
	'jap',
	'chink'
];

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Couldn't Find commands");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded`);
		bot.commands.set(props.help.name, props);
	});




});

bot.on("ready", async () =>  {
	console.log(`${bot.user.username} is now running`);

// Beginning of the Automated twitch announcement

  let twitchAutoChannel = bot.channels.get("450379772363538442");
  if (!twitchAutoChannel) return message.channel.send("Can't find Twitch Auto Channel");

  var postedAnnouncement = new Boolean(false);
  var announcementLoop = schedule.scheduleJob('* */3 * * * *', () => {
    request ({
      url: 'https://api.twitch.tv/kraken/streams/nubkeks?client_id=wgmissje9l67nel3xwxurzureger8k',
      json: true
    }, (error, response, body) => {
      if (!error && response.body.stream !== null && postedAnnouncement.valueOf() === false) {
        postedAnnouncement = true;
        // return twitchAutoChannel.send(` <:casconCringe:437671796284588032> :point_right: ${response.body.stream.channel.status} --- ${response.body.stream.game} --- ${response.body.stream.channel.url}`);
      } else if (response.body.stream === null && postedAnnouncement.valueOf() === true){
        postedAnnouncement = false;
      };
    });
  });

// Beginning of the Automated patch notes announcement

  let patchAutoChannel = bot.channels.get("450407190805872642");
  if (!patchAutoChannel) return message.channel.send("Can't find Patch Auto Channel");

  const patchNotesOptions = {
    uri: `https://heroespatchnotes.com/patch/`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(patchNotesOptions)
    .then(($) => {
      var postedLatest = "";

      var patchNotesLoop = schedule.scheduleJob('* * */1 * * *', function(){
        var latestPatchDate = $('.timeline').children('li', this).attr('id');
        var latestPatchLink = $(`#${latestPatchDate}`).children('.detail').children('div').next().children('a', this).attr('href');

        var patchBoolean = new Boolean(false);
        if (postedLatest !== latestPatchDate) {
          patchBoolean = false;
          postedLatest = latestPatchDate.toString();
        } else if (postedLatest === latestPatchDate) {
          patchBoolean = true;
        }

        if (patchBoolean.valueOf() === false) {
          // return patchAutoChannel.send(` The latest HOTS patch notes are released! Check them out here at: ${latestPatchLink}`);
        } else if (patchBoolean.valueOf() === true) {
          // Do Nothing
        };
      });
    })
  .catch((err) => {
    console.log(err);
  });

  // Beginning of the anti-spam module execution

  antispam(bot, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 6, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "Stop spamming or I'll whack your head off.", // Warning message send to the user indicating they are going to fast.
    banMessage: "Has been banned for spamming, anyone else?", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning: 5,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan: 10 // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  });
});

bot.on("message", async message => {
	if(message.channel.type === "dm")return;

// Beginning of the bad word filter
	let badWordChannel = message.guild.channels.find(`name`, "moderators");
	if (!badWordChannel) return message.channel.send("Can't find Bad Word Channel");

	var words = message.content.toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g);
	try {
		var containsBadWord = words.some(word => {
	    return badWordsList.includes(word);
		});
	} catch (error) {
		// Do nothing so error doesn't spam the console
	};

	try {
		var badWordEmbed = new Discord.RichEmbed()
		.setDescription("-BadWord-")
		.setColor("#ec895")
		.addField("Message Author", message.author)
		.addField("Time", message.createdAt)
		.addField("Message", message.toString());
	} catch (error) {
		//Do nothing so error doesn't spam console
	}

  if (containsBadWord) {
		if (message.member.roles.find("name", "Bot") || message.member.roles.find("name", "My Most Trusted Advisers") || message.member.roles.find("name", "Nubkeks Bot") || message.member.roles.find("name", "Admin")) {
			console.log("The user is one of the roles in which their message will NOT be deleted");
		} else {
			message.delete(1);
	    badWordChannel.send(badWordEmbed);
		}
  }

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);

	var Reberto = 206537691066531840;
	var tiral = 326812449783283712;
	var cascon = 149240392884158464;


 if(message.author.id === Reberto || message.author.id === tiral || message.author.id === cascon) {
	if(cmd === `${prefix}setraidtime`.toLowerCase()) {
		let date = args[0]
	    let Hours = args[1]
		let Minutes = args[2]
		let date2 = args[0]
		message.reply(`Greeting ${message.author.username}, the next raid is on ${date} at ${Hours}!`);
		console.log(`${date2}`)
		console.log(date)
		var test = date2;
		var raidDate = new Date(date).setHours(Hours, Minutes);
		setInterval(function() {
			console.log(raidDate);
			var now = new Date().getTime();
			var distance = raidDate - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 *60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);


			if(days === 0){
			if(minutes === 0) {
            if (seconds === 0) {
			if(hours === 1) {
				message.channel.send("@here Hello All wow Raiders! Just a reminder that the next raid is in 1 hour exactly!")
				return;
			}
			}
			}
			}

		}, 1000);

	}
 }

 function PlayNextStreamInQueue() {
     ytAudioQueue.splice(0, 1);

     if (ytAudioQueue.length != 0) {
         playStream(
           `${ytAudioQueue[0]}`,
           {filter: 'audioonly'}
         );
     }
 }



});
bot.login(botconfig.token);
