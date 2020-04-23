const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	message.channel.send({embed: {
		color: config.embedcolour,
		author: {
			name: config.botname,
			icon_url: client.user.avatarURL
		},
		title: `My patreon page`,
		url: `https://patreon.com/yogsoy`,
		description: `Thanks for your interest! You can find my patreon page at the link above.`,
		timestamp: new Date(),
		footer: {
			text: config.flavourtext
		}
	}});
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`patreon`,message.author.username,message.author.discriminator);
        }
};
