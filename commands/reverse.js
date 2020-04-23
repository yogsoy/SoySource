const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	var desrever = ``;
	if (config.delete) message.delete();
	var egassem = args.join(` `);
	for (letter = egassem.length - 1; letter > -1; letter--) {
		desrever += egassem[letter];
	}
	message.channel.send(desrever);
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`reverse`,message.author.username,message.author.discriminator, (args[0] ? args.join(` `) : false));
        }
};
