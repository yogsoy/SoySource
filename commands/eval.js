//const config = require("../config/config.json");
const fs = require(`fs`);
const request = require(`request`);
const hue = require(`../config/hue.json`);
const helpdocs = require(`../resources/helpdocs.json`);
const stickyourdickinalolineko = `I love to stick my dick in loli nekos.`;
const Discord = require("discord.js");
const ytdl = require(`ytdl-core`);
const chalk = require(`chalk`);
//const client = new Discord.client();

exports.run = (client,message,args,config) => {
	if (!config.owner.includes(message.author.id)) {
		message.channel.send("This command can only be run by the owner.");
	} else if (!args[0]) {
		message.channel.send("This command requires arguments, but none were provided.");
	} else {
		message.channel.startTyping();
		const clean = text => {
			if (typeof(text) === "string") {
				return text.replace(/"/g, `"` + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
			} else {
				return text;
			};
		};
		try {
			var code = args.join(" ");
			var evalout = eval(code);
			if (typeof evalout !== "string") {
				evalout = require("util").inspect(evalout);
			};
			if (evalout.includes(config.token)) {
				console.log(evalout);
				throw "Eval completed, but not sent due to inclusion of bot token. Result has been logged.";
			};
			var evalOutput = "```"+clean(evalout)+"```";
			var evalStatus = "Success";
		} catch (err) {
			var evalOutput = "```"+clean(err)+"```";
			var evalStatus = `Error`;
		};
		if (evalOutput.length + code.length > 1000) {
			console.log(evalout);
			var evalOutput = "```Response was greater than 1024 chars.```";
		};
		message.channel.send({embed: {
			color: config.embedcolour,
			author: {
				name: `SoySource Command Evaluator`,
				icon_url: client.user.avatarURL
			},
			title: `Command Evaluation `+evalStatus,
			fields: [{
				name: `Input:`,
				value: "```js\n"+clean(code)+" ```"
			},{
				name: evalStatus+`:`,
				value: evalOutput
			}],
			timestamp: new Date(),
			footer: {
				text: config.flavourtext
			}}});
		message.channel.stopTyping(true);
	};
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`eval`,message.author.username,message.author.discriminator, (code ? code : false));
        }
};
