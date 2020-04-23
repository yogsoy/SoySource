const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {

	var msg = message.channel.messages.last();
	for (i=0;i<1000;i++) {
		msg.react(`👌`);
		msg.clearReactions();
	}

	if (config.verbosecommands) {
		const log = require(`../commandlog.js`);
		log.run(`killme`,message.author.name,message.author.discriminator);
	}
};
