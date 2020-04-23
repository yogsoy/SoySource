const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (args[0]) {
		rng = Math.floor(Math.random() * args[0]);
	} else {
		rng = Math.floor(Math.random() * 10);
	}
	if (isNaN(rng)) {
		message.channel.send(`You gotta give me a *number*, my dude`);
	} else {
		message.channel.send(`Random number: ${rng}`);
	}
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`rng`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
}
