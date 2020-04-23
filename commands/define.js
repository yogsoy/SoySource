const config = require("../config/config.json");
const chalk = require(`chalk`);
const dictionary = require(`../resources/dictionary.json`);

exports.run = (client,message,args) => {
	if (!args[0] || args[1]) {
		message.channel.send(`Make sure to include a word for me to define, and only one at a time, please!`);
	} else {
		if (dictionary[args[0].toUpperCase()]) {
			message.channel.send({embed: {
				color: config.embedcolour,
				author: {
					name: `${config.botname} Dictionary Definitions`,
					icon_url: client.user.avatarURL
				},
				title: args[0],
				description: dictionary[args[0].toUpperCase()] + `\n\n***Taken from Webster's Unabridged English Dictionary***`,
				timestamp: new Date(),
				footer: {
					text: config.flavourtext
				}
			}});
		} else {
			message.channel.send(`Sorry, I couldn't find a definition for that word.`);
		}
	}
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`define`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
};
