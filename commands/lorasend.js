const config = require("../config/config.json");
const chalk = require(`chalk`);
const serialport = require(`serialport`);

exports.run = (client,message,args) => {

	if (!args[0]) {
		message.channel.send(`needs a payload, bro`);
		return;
	}
	var msg = args.join(` `);

	if (config.verbosecommands) {
		const log = require(`../commandlog.js`);
		log.run(`lorasend`,message.author.name,message.author.discriminator, (msg ? msg : null));
	}
};
