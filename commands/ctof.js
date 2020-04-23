const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	const toConvert = args[0];
	const converted = Math.round((toConvert * 1.8 + 32) * 100) / 100;
	if (!toConvert) {
		message.channel.send(`This command requires a tempurature value to convert.`);
	} else if (isNaN(converted)) {
		message.channel.send("Please use a valid number as the value to be converted.");
	} else {
		message.channel.send(toConvert + "°C to fahrenheit: **" + converted + "°F**");
	}

	if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`ctof`,message.author.username,message.author.discriminator, (toConvert ? toConvert + ` > ` + converted : false));
        }
}
