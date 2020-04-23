const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	message.channel.send(`Soylent, haha.<:soylent:464122718803984395>\nWhat a funny joke you have thought up there!<:soylent:464122718803984395>\nWowee!<:soylent:464122718803984395>\nVery well done, so funny!<:soylent:464122718803984395>\nI don't believe how funny that is!<:soylent:464122718803984395>`);

        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`lent`,message.author.username,message.author.discriminator);
        }
};
