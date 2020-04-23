var config = require("../config/config.json");
const chalk = require(`chalk`);
const fs = require(`fs`);

exports.run = (client,message,args) => {
	if (!config.owner.includes(message.author.id)) {
		message.channel.send(`Sorry, you don't have access to this command.`);
		return;
	} else {
		if (!args[0] || !args[1]) {
			message.channel.send(`This command requires arguments in the form of ${config.prefix}configchange [object] [property].`);
			return;
		} else {
			var toChange = args.shift();
			var content = args.join(` `);
			if (content == `true`) {
				content = true;
			} else if (content == `false`) {
				content = false;
			}
			config[toChange] = content;
			message.channel.send(`Changed the config file object \`${toChange}\` to \`${content}\``).then(function() {
				fs.writeFileSync(`/home/elyshea/soysource/config/config.json`, JSON.stringify(config).replace(",",",\n"))
			});
		};
	};
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`configchange`,message.author.username,message.author.discriminator, (toChange ? toChange + ` > ` + content : false));
        }
};
