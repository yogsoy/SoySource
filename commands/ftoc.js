const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	const toConvert = args[0];
	const converted = Math.round(((toConvert - 32) / 1.8) * 100) / 100;
	if (!toConvert) {
		message.channel.send(`This command requires a tempurature value to convert.`);
	} else if (isNaN(converted)) {
        message.channel.send("Please use a valid number as the value to be converted.");
    } else {
		message.channel.send(toConvert + "°F to celsius: **" + converted + "°C**");
	}

        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`ftoc`,message.author.username,message.author.discriminator, (toConvert ? toConvert+` > `+converted : false));
        }
}
