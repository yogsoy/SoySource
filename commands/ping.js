const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	function rn() {
		switch(Math.floor(Math.random() * 3)) {
			case 0:
				return "ing";
				break;
			case 1:
				return "ibg";
				break;
			case 2:
				return "ang";
				break;
		}
	}
	message.channel.send({embed: {
		color: config.embedcolour,
		author: {
			name: `${config.botname} Ping`,
			icon_url: client.user.avatarURL
		},
		description: `You've been p${rn()}ed! `+Math.round(client.ping * 10) / 10+`ms`
	}});
	if (config.verbosecommands) {
		const log = require(`../commandlog.js`);
		log.run(`ping`,message.author.username,message.author.discriminator);
	};
}
