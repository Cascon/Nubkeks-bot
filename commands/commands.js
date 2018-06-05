const discord = require('discord.js');

const commandList = ["!builds",
  "!coinflip",
  "!join",
  "!leave",
  "!play",
  "!queue",
  "!schedule",
  "!search",
  "!skip",
  "!social",
  "!stream",
  "!tierlist",
  "!volume"
];

var commandPrint = [];
for (var i = 0; i < commandList.length; i++) {
  commandPrint.push(commandList[i]);
};

module.exports.run = async(bot, message, args) => {
  message.channel.send(commandPrint);
}

module.exports.help = {
  name: "commands"
}
