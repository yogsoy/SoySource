const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	const bottime = `${message.createdAt}`;
	const formattime = bottime.split(` `,5);
	var formatted = `${formattime[1]} ${formattime[2]} ${formattime[3]} ${formattime[4]}`;
	var formatted = formatted.trim();
	
	//conversion mainly courtesy of Royi Namir on stack overflow, the lad
	var seconds = client.uptime / 1000;
	var numdays = Math.floor((seconds % 31536000) / 86400); 
	var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
	var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
	var uptimefull = `${numdays}d ${numhours}:${numminutes}:${numseconds}`;
	
	message.channel.send({embed: {
		color: config.embedcolour,
		author: {
			name: `${config.botname} Info`,
			icon_url: client.user.avatarURL
		},
		title: `Bot Website`,
		url: `http://bot.yogsoy.pw`,
		fields: [{
			name: `Prefix:`,
			value: "`"+config.prefix+"`",
			inline: true
		},{
			name: `Bot Time:`,
			value: "`"+formatted+"`",
			inline: true
		},{
			name: `Bot Version:`,
			value: "`"+config.version+"`",
			inline: true
		},{
			name: `Version Notes:`,
			value: "`"+config.vernotes+"`",
			inline: true
		},{
			name: `Guild Name:`,
			value: "`"+message.guild+"`",
			inline: true
		},{
			name: `Guild Region:`,
			value: "`"+message.guild.region.replace("-"," ")+"`",
			inline: true
		},{
			name: `Channel ID:`,
			value: "`"+message.channel+"`",
			inline: true
		},{
			name: `Bot Uptime:`,
			value: "`"+uptimefull+"`",
			inline: true
		}],
		timestamp: new Date(),
		footer: {
			text: config.flavourtext
		}}});
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`info`,message.author.username,message.author.discriminator);
        }
}
