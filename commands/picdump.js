const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
//	for (currentMessage in message.channel.messages) {
//		console.log(message.channel.messages[currentMessage]);
//	}

//	console.log(message.channel.messages);

        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`picdump`,message.author.username,message.author.discriminator);
        }
};
