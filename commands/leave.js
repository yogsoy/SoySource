const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (client.voiceConnections.has(message.guild.id)) {
		var vc = client.voiceConnections.get(message.guild.id);
		vc.disconnect();
		message.channel.send(`Left voice channel \`${vc.channel.name}\``);
	} else {
		message.channel.send(`I'm not in a voice channel, silly!`);
	}
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`leave`,message.author.username,message.author.discriminator);
        }
};
