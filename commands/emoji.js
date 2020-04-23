const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	var msg = args.join(` `);
	if (config.delete) message.delete();
	var emojid = ``;
	for (letter = 0; letter < msg.length; letter++) {
		if ([`a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`w`,`x`,`y`,`z`].includes(msg[letter].toLowerCase())) {
			emojid += `:regional_indicator_${msg[letter].toLowerCase()}: `;
		} else if (msg[letter] == ` `) {
			emojid += `   `;
		} else {
			emojid += msg[letter];
		}
	}
	message.channel.send(emojid);
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`emoji`,message.author.username,message.author.discriminator, (msg ? msg : false));
        }
};
