const config = require("../config/config.json");
const osu = require(`node-osu`);
const osuconfig = require(`../config/osu.json`);
const chalk = require(`chalk`);
const osuRegister = require(`../config/osuregister.json`);

exports.run = (client,message,args) => {
	if (!args[0]) {
		if (osuRegister[message.author.id]) {
			var requestUsername = osuRegister[message.author.id];
			getOsuData(osuRegister[message.author.id]);
		} else {
			message.channel.send(`I couldn't find an osu! username assigned to your account. Please use \`${config.prefix}osureg\` or include an osu! username in this command.`);
		};
	} else if (message.mentions.users.first()) {
			if (osuRegister[message.mentions.users.first().id]) {
				getOsuData(osuRegister[message.mentions.users.first().id]);
				var requestUsername = osuRegister[message.mentions.users.first().id];
			} else {
				message.channel.send(`That user doesn't seem to have registered their osu! username with me. They can do so with \`${config.prefix}osureg\`.`);
			}
	} else {
		getOsuData(args.join(` `))
		var requestUsername = args.join(` `);
	};
	function getOsuData(requestUsername) {
		var osuapi = new osu.Api(osuconfig.apikey, {
			baseUrl: `https://osu.ppy.sh/api`,
			notFoundAsError: true,
			completeScores: false
		});
		try {
			osuapi.getUser({u:requestUsername}).then(user => {
				var osuser = user;
				//console.log(osuser);
				message.channel.send({embed: {
					color: config.embedcolour,
					author: {
						name: `${config.botname} Osu Interface - osu! Profile for ${osuser.name} (#${osuser.pp.rank}, ${osuser.country})`,
						icon_url: client.user.avatarURL
					},
					fields: [{
						name: `Total PP:`,
						value: osuser.pp.raw,
						inline: true
					},{
						name: `Total Score:`,
						value: osuser.scores.total,
						inline: true
					},{
						name: `Plays:`,
						value: osuser.counts.plays,
						inline: true
					},{
						name: `Overall Acc:`,
						value: osuser.accuracyFormatted,
						inline: true
					}],
					timestamp: new Date(),
					footer: {
						text: config.flavourtext
				}}});
			}, err => {
				message.channel.send(`Unable to retrieve player data for ${requestUsername}. Perhaps you mistyped the user?`);
				console.error(`Unable to retrieve player scores for ${requestUsername}: ${err}`);
			});
		} catch (err) {
			message.channel.send(`Unable to retrieve player information.`);
			console.error(err);
		};
	};
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`osu`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
}
