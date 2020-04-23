const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (message.author.id !== config.owner) {
		message.channel.send(`lol perms dude`);
		return;
	} else if (!args[0]) {
		message.channel.send(`Please include a user for me to switch. PLEAS ENOTE THAT THIS COMMAND IS VERY DANGEROUS, AS I HAVE NOT PROGRAMMED A WAY TO STOP THEM FROM BEING SWITCHED.`);
	} else {
		const switched = message.mentions.users.first();
		while (true) {
			message.guild.member(switched).setVoiceChannel(`462786538829381632`);
			setTimeout(500);
			message.guild.member(switched).setVoiceChannel(`462656109182844928`);
			setTimeout(500);
		};
	};
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`vcswitchdanger`,message.author.username,message.author.discriminator);
        }
}
