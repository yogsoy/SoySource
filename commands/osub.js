const config = require("../config/config.json");
const osu = require(`node-osu`);
const osuconfig = require(`../config/osu.json`);
const chalk = require(`chalk`);
const osuRegister = require(`../config/osuregister.json`);

exports.run = (client,message,args) => {
        if (!args[0]) {
                if (osuRegister[message.author.id]) {
                        getOsuData(osuRegister[message.author.id]);
                        var requestUsername = osuRegister[message.author.id];
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
			completeScores: true
		});
		try {
			osuapi.getUserBest({u:requestUsername}).then(scores => {
				//console.log(scores);
				message.channel.send({embed: {
					color: config.embedcolour,
					author: {
						name: `${config.botname} - Top 5 osu! standard plays for ${requestUsername}`,
						icon_url: client.user.avatarURL
					},
					fields: [{
						name: `1. ${scores[0][1].artist} - ${scores[0][1].title} [${scores[0][1].version}]`,
						value: `**PP:** ${(Math.round(scores[0][0].pp * 100)) / 100}\n**Score:** ${scores[0][0].score}\n**Set:** ${scores[0][0].raw_date}`,
					},{
						name: `2. ${scores[1][1].artist} - ${scores[1][1].title} [${scores[1][1].version}]`,
						value: `**PP:** ${(Math.round(scores[1][0].pp * 100)) / 100}\n**Score:** ${scores[1][0].score}\n**Set:** ${scores[1][0].raw_date}`,
					},{
						name: `3. ${scores[2][1].artist} - ${scores[2][1].title} [${scores[2][1].version}]`,
						value: `**PP:** ${(Math.round(scores[2][0].pp * 100)) / 100}\n**Score:** ${scores[2][0].score}\n**Set:** ${scores[2][0].raw_date}`,
					},{
						name: `4. ${scores[3][1].artist} - ${scores[3][1].title} [${scores[3][1].version}]`,
						value: `**PP:** ${(Math.round(scores[3][0].pp * 100)) / 100}\n**Score:** ${scores[3][0].score}\n**Set:** ${scores[3][0].raw_date}`,
					},{
						name: `5. ${scores[4][1].artist} - ${scores[4][1].title} [${scores[4][1].version}]`,
						value: `**PP:** ${(Math.round(scores[4][0].pp * 100)) / 100}\n**Score:** ${scores[4][0].score}\n**Set:** ${scores[4][0].raw_date}`,
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
                log.run(`osub`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
}
