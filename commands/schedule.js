const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
	message.channel.send("**Every weekday** (Monday-Firday) Nubkeks will be streaming at **1pm GMT** | **6am PT** for a good few hours. Nubkeks also streams every **Friday** at **10pm GMT** | **3pm PT** on the **TGN Squadron youtube channel!**")
}

module.exports.help = {
	name : "schedule"
}