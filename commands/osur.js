const config = require("../config/config.json");
const osu = require(`node-osu`);
const osuconfig = require(`../config/osu.json`);
const chalk = require(`chalk`);
const osuRegister = require(`../config/osuregister.json`);
const modlist = require(`../resources/osu_modlist.json`);

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
			osuapi.getUserRecent({u:requestUsername}).then(scores => {
				//console.log(scores);
				//console.log(scores[0]);
				if (scores[0][0].pp == null) {
					var calcPP = `No PP`;
				} else {
					var calcPP = scores[0][0].pp;
				};
				var hit300 = Number(scores[0][0].counts["300"]) + Number(scores[0][0].counts["geki"]);
				var hit100 = Number(scores[0][0].counts["100"]) + Number(scores[0][0].counts["katu"]);
				var hit50 = scores[0][0].counts["50"];
				var hitmiss = scores[0][0].counts["miss"];
				var hitsmade = hit300 + hit100 + Number(hit50);
				var rawmods = scores[0][0].raw_mods;
				var mods = `none`;
				//console.log(rawmods);
				for (i = 8192; i > 0.6; i=i/2) {
						//console.log(i,rawmods,mods);
						if (rawmods - i > -1 && i != 4) {
							mods += modlist[i.toString()];
							rawmods -= i;
						}
				}
				if (mods != `none`) mods = mods.slice(4);
				message.channel.send({embed: {
					color: config.embedcolour,
					author: {
						name: `${config.botname} - Most recent ranked play for ${requestUsername}:`,
						icon_url: client.user.avatarURL
					},
					title: `**${scores[0][1].artist} - ${scores[0][1].title} [${scores[0][1].version}]**`,
					url: `https://osu.ppy.sh/b/${scores[0][1].id}`,
					fields: [{
						name: `Mods:`,
						value: mods,
						inline: true
					},{
						name: `Rank:`,
						value: scores[0][0].rank,
						inline: true
					},{
						name: `Score:`,
						value: scores[0][0].score,
						inline: true
					},{
						name: `Star Rating:`,
						value: `${Math.round(scores[0][1].difficulty.rating * 100) / 100}*`,
						inline: true
					},{
						name: `Max Combo:`,
						value: `${scores[0][0].maxCombo}x (of ${scores[0][1].maxCombo})`,
						inline: true
					},{
						name: `Unweighted PP:`,
						value: calcPP,
						inline: true
					},{
						name: `Hit Counts:`,
						value: `[${hit300} | ${hit100} | ${hit50} | ${hitmiss}] (${hitsmade}/${scores[0][1].maxCombo})`,
						inline: true
					//},{
					//	name: `Completion:`,
					//	value: `${Math.round((hitsmade / Number(scores[0][1].maxCombo)) * 10000) / 100}%`,
					//	inline: true
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
                log.run(`osur`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
};
