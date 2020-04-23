const config = require("../config/config.json");
const helpdocs = require("../resources/helpdocs.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	if (args[0]) {
		if (args[0] in helpdocs) {
			message.channel.send({embed: {
				color: config.embedcolour,
				author: {
					name: `${config.botname} Help`,
					icon_url: client.user.avatarURL
				},
				fields: [{
					name: config.prefix+args[0],
					value: helpdocs[args[0]].text
				},{
					name: "Example input:",
					value: "```"+config.prefix+args[0]+` `+helpdocs[args[0]].examplein+"```"
				},{
					name: "Expected Output:",
					value: "```"+helpdocs[args[0]].exampleout+"```"
				}],
				timestamp: new Date(),
				footer: {
					text: config.flavourtext
			}}});
		} else {
			message.channel.send(`Sorry, I don't recognise the command **${args[0]}**. If you think this is in error, please mention me in a message using my tag, <@463016645191925760>, and my owner will be notified.`);
		};
	} else {
		var commandsFormatted = "";
		for (h in helpdocs) {
			commandsFormatted = commandsFormatted + `**${helpdocs[h].name}**, `;
		};
		var commandsFormatted = commandsFormatted.slice(0,-2);
		message.channel.send({embed: {
			// put embed of command list here
			color: config.embedcolour,
			author:{
				name: `${config.botname} Help`,
				icon_url: client.user.avatarURL
			},
			description: `Use \`${config.prefix}help [command]\` to get extra help about a command.`,
			fields: [{
				name: `Available Commands:`,
				value: commandsFormatted
			}],
			timestamp: new Date(),
			footer: {
				text: config.flavourtext
			}}})};

        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`help`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
};
