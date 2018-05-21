const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.channel.send("You can find all of my upto date builds here! https://heroeshearth.com/builds/nubkeks/")
}

module.exports.help = {
	name : "builds"
}