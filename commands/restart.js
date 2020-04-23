const config = require("../config/config.json");
const chalk = require(`chalk`);
const shelljs = require(`shelljs`);

exports.run = (client,message,args) => {
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`restart`,message.author.username,message.author.discriminator);
        }
	if (!config.owner.includes(message.author.id)) {
		message.channel.send(`Sorry, you don't have the required permissions.`);
	} else {
		message.channel.send(`Restarting...`).then(function() {
			var exec = require(`child_process`).exec;
			var command = `pm2  restart soysource`;
			exec(command, function(error,stdout,stderr) {});
		});
	};
};
