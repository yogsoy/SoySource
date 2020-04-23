const config = require(`./config/config.json`);
const chalk = require(`chalk`);

exports.run = (command, user, discriminator, comment, error) => {
	if (config.verbosecommands) {
		//if (!command || !user) return;
		var time = new Date();
		console.log(chalk.yellow(`[${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`+
					` ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]`+
					` ${command}`+
					`${comment ? ` (`+chalk.inverse(comment)+`)`: ``}`+
					` ${discriminator && user ? `- ` + chalk.cyan.bgBlue(`@`+user+`#`+discriminator) : ``}`+
					` ${error ? `\n${chalk.red(error)}` : ``}`));
	}
}
