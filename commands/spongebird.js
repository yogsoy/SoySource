const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	var caveman = args.join(` `);
	var output = ``;
	if (caveman.length == 0) {
		output = `gIvE mE sOmEtHiNg tO mOcK`;
	} else {
		if (config.delete) message.delete();
		for (letter = 0; letter < caveman.length; letter++) {
			if (letter % 2 == 0) {
				output += caveman[letter].toLowerCase();
			} else {
				output += caveman[letter].toUpperCase();
			}
		}
	}
	message.channel.send(output);
	if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`spongebird`,message.author.username,message.author.discriminator, (caveman ? caveman : false));
        }
};
