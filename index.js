const botconfig = require ("./botconfig.json")
const Discord = require(`discord.js`);
const client = new Discord.Client();
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();



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
});
bot.on("message", async message => {
	if(message.channel.type === "dm")return;


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





});
bot.login(botconfig.token);
