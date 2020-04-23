const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (!args[0]) {
		message.channel.send(`Gimme something to a e s t h e t i c i s e, my dude`);
	} else {
		var aesthetisise = args.join(` `).toLowerCase();
		if (config.delete) message.delete();
		var aesthetic = ``;
		for (letter = 0; letter < aesthetisise.length; letter++) {
			aesthetic += `${aesthetisise[letter]} `;
		}
		message.channel.send(aesthetic);
	};
	if (config.verbosecommands) {
		const log = require(`../commandlog.js`);
		log.run(`aesthetic`,message.author.username,message.author.discriminator, (aesthetisise ? aesthetisise : false));
	}
};
