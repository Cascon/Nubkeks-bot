const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
	message.channel.send("Check out all my tierlists here! https://heroeshearth.com/tiers/nubkeks/")
}

module.exports.help = {
	name : "tierlist"
}