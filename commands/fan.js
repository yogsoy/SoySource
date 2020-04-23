const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (config.allowLight || config.owner.includes(message.author.id)) {
		if (args[0] == "on") {
			switch_wemo("on");
		} else if (args[0] == "off") {
			switch_wemo("off");
		} else {
			message.channel.send("`on` or `off`, please.");
		}

		function switch_wemo(state) {
			var command = `python3 ~/soysource/sidescripts/wemo_client.py --device 192.168.1.23 --${state}`
			var exec = require('child_process').exec;
			exec(command, function(error, stdout, stderr) {})
			message.channel.send(`Yup, did it.`);
		}
	} else {
		message.channel.send("no");
	}
	if (config.verbosecommands) {
		const log = require(`../commandlog.js`);
		log.run(`fan`,message.author.name,message.author.discriminator,(args[0]?args[0]:false));
	}
};
