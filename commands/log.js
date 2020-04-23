const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	console.log(args.join(" "));
	message.channel.send(`Logged ` + "```" + args.join(" ") + "``` to console.");
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`log`,message.author.username,message.author.discriminator, (args[0] ? args.join(` `) : false));
        }
}
