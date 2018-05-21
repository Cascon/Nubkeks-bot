const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
	let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!kickUser) return message.channel.send(`Could not find user`);
		let kickReason = args.join("").slice(22);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can not kick that user");
		if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't kick this user!")
		
		let kickEmbed = new Discord.RichEmbed()
		.setDescription("-Kick-")
		.setColor("#ec895")
		.addField("Kicked user", `${kickUser} who's id is ${kickUser.id}`)
		.addField("Kicked By", `<@${message.author.id}>`)
		.addField("Time", message.createdAt)
		.addField("Reason", kickReason);
		
		let kickChannel = message.guild.channels.find(`name`, "moderators");
		if(!kickChannel) return message.channel.send("Can't find Channel");
		
		message.guild.member(kickUser).kick(kickReason)
		kickChannel.send(kickEmbed)
		return;
}

module.exports.help = {
	name : "kick"
}