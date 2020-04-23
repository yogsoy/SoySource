const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	var done = ``;
	for (i=1; i<31; i++) {
		var output = ``;
		if (i%5 == 0 || i%3 == 0) {
			if (i%3 == 0)
				output = `Fizz`;
			if (i%5 == 0)
				output += `Buzz`;
		} else {
			output = i;
		}
		done += i+` = `+output+`\n`;
	}
	message.channel.send(done);
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`fizzbuzz`,message.author.username,message.author.discriminator);
        }
};
