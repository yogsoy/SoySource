const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {

        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`soyban`,message.author.username,message.author.discriminator);
        }
};
