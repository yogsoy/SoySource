const config = require("../config/config.json");
const osu = require(`../config/osu.json`);
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (!config.owner.includes(message.author.id)) {
		message.channel.send("This command can only be run by the owner/s.");
	} else if (!args[0]) {
		message.channel.send("This command requires arguments, but none were provided.");
	} else {
		message.channel.startTyping();
		var exec = require('child_process').exec;
		var command = args.join(` `);
		exec(command, function(error, stdout, stderr) {
			if (!stderr) {
				console.log(stdout)
				if (stdout.includes(config.token) || stdout.includes(osu.apikey)) {
					var stdout = "Execution completed, but not sent due to inclusion of a token. Result has been logged to bot console.";
				};
				var execstatus = "Execution Completed:";
				var execout = stdout;
			} else {
				console.log(stderr)
				var execstatus = "Execution Error:";
				var execout = stderr;
			};
			if (execout.length > 1015) {
				var execout = "Execution attempted, result was greater than allowed character count. Result has been logged to bot console.";
			};
			message.channel.stopTyping(true);
			message.channel.send({embed: {
				color: config.embedcolour,
				author: {
					name: `SoySource Highly Informative Terminal (S.H.I.T)`,
					icon_url: client.user.avatarURL
				},
				fields: [{
					name: `Input:`,
					value: "```"+command+"```"
				},{
					name: execstatus,
					value: "```"+execout+"```"
				}],
				timestamp: new Date(),
				footer: {
					text: config.flavourtext
			}}});
		});
	};
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`exec`,message.author.username,message.author.discriminator, (command ? command : false));
        }
};
