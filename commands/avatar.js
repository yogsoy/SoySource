const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	message.reply({files:[message.author.avatarURL]});
	if (config.verbosecommands) {
		const log = require(`../commandlog.js`);
		log.run(`avatar`,message.author.username,message.author.discriminator);
	}
}
