const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
var coin = Math.floor((Math.random() * 2) + 1);
	if(coin == 1) {
		return message.channel.send("**Heads**");
	}else if(coin == 2) {
		return message.channel.send("**Tails**");
	}
	}

module.exports.help = {
	name: "coin"
}