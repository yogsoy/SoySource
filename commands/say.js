const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	var flag = false;
	var channel;
	var sayMessage;
	if (config.owner.includes(message.author.id)) {
		if (args[0] && args[1]) {
			try {
				channel = args.shift().slice(2,-1); // this is due to how channel mentions work in discord
				sayMessage = args.join(` `);
	
				client.channels.get(channel).send(sayMessage); // client here may need to be replaced with bot, or app, or whatever you're using - client.channels returns a collection, which we use get() to find an item in
				if (config.delete) message.delete(); // you may want to add a catch() here, i didn't because my bot requires permissions to be added to a server
				flag = true;
			} catch(err) {
				message.channel.send(`The say command requires both a channel to send to and a message: \`${config.prefix}say #general hello there\``);
			}
		} else {
			message.channel.send(`The say command requires both a channel to send to and a message: \`${config.prefix}say #general hello there\``);
		}
	}
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`say`,message.author.username,message.author.discriminator, (channel && sayMessage && flag ? `#`+client.channels.get(channel).name+`: `+sayMessage : false));
        }
};
