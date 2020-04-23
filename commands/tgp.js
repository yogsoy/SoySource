const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	message.channel.send(`<:tgp:374037209050775565>`);

        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`tgp`,message.author.username,message.author.discriminator);
        }
};
