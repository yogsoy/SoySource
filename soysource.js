console.log(`Started at ${new Date()}`);

const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require(`chalk`);
const config = require("./config/config.json");
const bannedusers = require(`./config/bannedusers.json`);
const commandlog = require(`./commandlog.js`);
console.log(chalk.blue("Config loaded."));
console.log(chalk.blue(`Command logging loaded.`));
console.log(chalk.blue("Current prefix: ") + config.prefix);
console.log(chalk.blue("Current version: ") + config.version);
var firstBoot = true;
client.on(`ready`, () => {
	if (firstBoot) client.user.setUsername(config.botname);
	console.log(chalk.blue(`Set bot name to `) + config.botname);
	client.user.setStatus(`available`)
	client.user.setPresence({
		game: {
			name: config.playing,
			type: 0
		}
	});
	console.log(chalk.blue(`Set playing status to `) + config.playing);
	console.log(chalk.blue("Client ready."));
	firstBoot = false;
});
//const fs = require("fs");
//console.log(chalk.blue("FS loaded."));
const commandFail = require(`./resources/failedcommand.json`);
console.log(chalk.blue(`Error messages loaded.`));

var ouijaoutput = {};
var last;

client.on("message", async message => {
	//console.log(message.guild.name,message.content);
	if (message.author.id == client.user.id) return;

	if (message.channel.type == `dm`) {
		if (config.owner.includes(message.author.id)) {
			var msg = message.content.split(` `);
                        if (!isNaN(msg[0]) && msg[0].length == 18) {
				if (client.users.get(msg[0])) {
					var dm = client.users.get(msg.shift());
					last = dm;
	                                dm.send(msg.join(` `));
					message.channel.send(`Sent DM \`\`\`${msg.join(` `)}\`\`\` to @${dm.tag}`);
				} else {
					message.channel.send(`User not found.`);
				}
                        } else if (last) {
				if (client.users.get(last.id)) {
					last.send(msg.join(` `));
					message.channel.send(`Sent DM \`\`\`${msg.join(` `)}\`\`\` to @${last.tag}`);
				} else if (!last.tag) {
					last.send(msg.join(` `));
					message.channel.send(`Sent message \`\`\`${msg.join(` `)}\`\`\` in channel \`#${last.name}\` in \`${last.guild.name}\``);
				} else {
					message.channel.send(`Last user not found`);
				}
			} else {
				message.channel.send(`No last message found.`);
			}
		} else {
			if (!last || last.id != message.author.id) {
				message.author.send(`Sorry, I can't respond directly to DMs, but I've forwarded your message to my owner/s.\nDo have a good day!`);
			}
			last = message.author;
			commandlog.run(`DMRecieve`,message.author.username,message.author.discriminator,(message.content ? message.content : "[NO CONTENT]"));
			sendOwner(``,``,`<@!${message.author.id}> (@${message.author.tag}, ${message.author.id}) sent me a DM`,`Message Content:`,(message.content ? message.content : "[NO CONTENT]"));
		}
		return;
	}

	//simple moderation for askouija channels
	if (message.channel.name.toLowerCase() == `askouija`) {
		if (message.content.toLowerCase() != `goodbye`) {
			if (message.content.length != 1) {
				message.delete();
				return;
			}
			if (!ouijaoutput[message.guild.id]) {
				ouijaoutput[message.guild.id] = message.content;
			} else {
				ouijaoutput[message.guild.id] += message.content;
			}
		} else {
			if (ouijaoutput[message.guild.id].length == 0) {
				message.delete();
				return;
			}
			commandlog.run(`ASKOUIJA`,``,``,ouijaoutput[message.guild.id]);
			message.channel.send(`OUIJA SAYS: **${ouijaoutput[message.guild.id]}**`);
			ouijaoutput[message.guild.id] = ``;
		}
	}

	if (message.author.bot) return;

	if (message.content.includes(`@someone`) && config.someone) {
		function findRandomMember() {
			var members = Array.from(message.member.guild.members);
			var member = members[Math.floor(Math.random() * members.length)];
			if (member[1].user.bot) {
				findRandomMember();
			} else {
				return member;
			}
		}
		var choseth = findRandomMember();
		message.channel.send(`<@!${choseth[1].user.id}>`);
		commandlog.run(`@SOMEONE`,message.author.username,message.author.discriminator,choseth[1].user.tag);
	}

	if (message.content.includes(`<@!${client.user.id}>`) || message.content.includes(`<@${client.user.id}>`)) {
		if (message.author.id != client.user.id) {
			last = message.channel;
			if (config.verbosecommands == true) {
				commandlog.run(`MENTION`,message.author.username,message.author.discriminator,message.content);
			}
			sendOwner(`I was mentioned in this message (#${message.channel.name} in \`${message.guild.name}\`)`,`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`,`by <@!${message.author.id}> (@${message.author.tag}, ${message.author.id})`,`Message Content:`,message.content);
		}
	};

	if(message.content.toLowerCase().indexOf(config.prefix) !== 0) return;
	if (bannedusers.includes(message.author.id)) {
                message.reply(`You are banned from using ${config.botname} commands.`);
                message.delete();
                return;
        }
	if (message.content == config.prefix) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args, config);
	} catch (err) {
                var messageChosen = commandFail.messages[Math.floor(Math.random() * commandFail.messages.length)];
                message.channel.send("```"+messageChosen+"```Please note that this may be due to an error server-side.\nIf you'd like to submit some feedback, @mention me.");
		commandlog.run(`ERROR`, message.author.username, message.author.discriminator, message.content, err);
	};
});
console.log(chalk.blue("Commands ready."));
client.login(config.token);
console.log(chalk.blue("Client logged in and token loaded: ") + config.token);

function sendOwner(title,url,desc,fieldname,fieldcontent) {
	for (owners of config.owner) {
		client.users.get(owners).send({embed: {
			color: config.embedcolour,
			author: {
				name: `${config.botname} Community Response`,
				icon_url: client.user.avatarURL
			},
			title: title,
			url: url,
			description: desc,
			fields: [{
				name: fieldname,
				value: fieldcontent
			}],
			timestamp: new Date(),
			footer: {
				text: config.flavourtext
			}
		}});
	}
}
