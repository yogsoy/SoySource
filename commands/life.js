const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	message.channel.send(`Jack doesn't have a life!`);
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`life`,message.author.username,message.author.discriminator);
        }
};
