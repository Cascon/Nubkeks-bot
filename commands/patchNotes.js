const Discord = require("discord.js");
const request = require("request");
const rp = require('request-promise');
const cheerio = require('cheerio');
const schedule = require("node-schedule");

module.exports.run = async(bot, message, args) => {
  const options = {
    uri: `https://heroespatchnotes.com/patch/`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(options)
    .then(($) => {
      var postedLatest = "";

      var patchNotesLoop = schedule.scheduleJob('* * */1 * * *', function(){
        var latestPatchDate = $('.timeline').children('li', this).attr('id');
        var latestPatchLink = $(`#${latestPatchDate}`).children('.detail').children('div').next().children('a', this).attr('href');

        var patchBoolean = false;
        if (postedLatest !== latestPatchDate) {
          patchBoolean = false;
          postedLatest = latestPatchDate.toString();
        } else if (postedLatest === latestPatchDate) {
          patchBoolean = true;
        }

        if (patchBoolean === false) {
          return message.channel.send(`@here The latest HOTS patch notes are released! Check them out here at: ${latestPatchLink}`);
        } else if (patchBoolean === true) {
          // Do nothing
          // return message.channel.send("If this shows after the patch notes then the timer + if statement are working as intended");
        };
      });
    })
  .catch((err) => {
    console.log(err);
  });
}

module.exports.help = {
	name: "patchNotes"
}
