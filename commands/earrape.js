const config = require("../config/config.json");
const ytdl = require(`ytdl-core`);
const chalk = require(`chalk`);
const urls = ["qnIpG7E3eOQ","5bHimOJb-Xw","WWB01IuMvzA","Ec7DfCsRVJc","-8rTfTm6JN0","SY-KGRjOM08","WGux_CVBxOA","JaBmR8tC1oU"];
const search = require(`youtube-search`);
const youtubedata = require(`../config/youtube.json`);

const opts = {
	maxResults: 1,
	key: youtubedata.key
};

exports.run = (client,message,args) => {
	if (message.member.voiceChannel) {
		const voiceChannel = message.member.voiceChannel;
		if (args[0]) {
			search(args.join(` `), opts, function(err,results) {
				if (err) {
					message.channel.send(`No results.`);
					return;
				}
				joinVoice(results[0].id);
				message.channel.send({embed: {
					color: config.embedcolour,
					author: {
						name: config.botname+` Earrape YouTube Player`,
						icon_url: client.user.avatarURL
					},
                                        thumbnail: {
                                                url: results[0].thumbnails.default.url
                                        },
					title: `Playing \`${results[0].title}\``,
					url: results[0].link,
					description: `**Uploaded by:** ${results[0].channelTitle} **on:** ${results[0].publishedAt.slice(0,10)}`,
					timestamp: new Date(),
					footer: {
						text: config.flavourtext
					}
				}});
			});
		} else {
			joinVoice(urls[Math.floor(Math.random() * urls.length)]);
			message.channel.send(`Since you didn't provide a search term for me, I'm playing a video from my small collection.\n\`because i can, thats why\``);
		}
		function joinVoice(url) {
			voiceChannel.join().then(function (connection) {
				var stream = ytdl(url, {
					filter: (audioonly) => true
				});
				const dispatcher = connection.playStream(stream);
				dispatcher.setVolume(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
				dispatcher.on(`end`, () => {message.channel.send(`Playing finished`)});
			});
		}
	} else {
		message.channel.send(`yOu'D bEtTeR bE gEtTiNg In A vOiCe ChAnNeL`)
	}
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`earrape`,message.author.username,message.author.discriminator, (args[0] ? args.join(` `) : false));
        }
};
