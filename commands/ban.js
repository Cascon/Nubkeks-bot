const discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
	let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!banUser) return message.channel.send(`Could not find user`);
		let banReason = args.join("").slice(22);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can not ban that user");
		if(banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't ban this user!")
		
		let banEmbed = new Discord.RichEmbed()
		.setDescription("-ban-")
		.setColor("#ec895")
		.addField("baned user", `${banUser} who's id is ${banUser.id}`)
		.addField("baned By", `<@${message.author.id}>`)
		.addField("Time", message.createdAt)
		.addField("Reason", banReason);
		
		let banChannel = message.guild.channels.find(`name`, "moderators");
		if(!banChannel) return message.channel.send("Can't find Channel");
		
		message.guild.member(banUser).ban(banReason)
		banChannel.send(banEmbed)
		return;
}

module.exports.help = {
	name : "ban"
}