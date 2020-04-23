const config = require("../config/config.json");
const request = require(`request`);
const hue = require(`../config/hue.json`);
const chalk = require(`chalk`);

const lights = hue.lights;

exports.run = (client,message,args) => {
	if (!config.owner.includes(message.author.id) && !config.allowLight) {
		message.reply(`Sorry, you don't have permission to use this command.`);
		return;
	} else if (!args[0]) {
		message.reply("Please include a light for me to toggle.");
		return;
	} else if (parseInt(args[0])) {
		if (config.owner.includes(message.author.id)) {
			var lightToChange = args[0];
		} else {
			var lightToChange = hue.lights[args[0]];
		}
		const url = `http://${hue.bridge}/api/${hue.username}/lights/${lightToChange}`;
		request({uri:url,method:`GET`}, function (error,response,body) {
			if (!error && response.statusCode == 200) {
				if (body.includes(`"on":true`)) {
					var options = {
						uri: `${url}/state`,
						method: `PUT`,
						json: {
							"on":false
						}
					};
					//console.log(`on was true`);
				} else if (body.includes(`"on":false`)) {
					var options = {
						uri: `${url}/state`,
						method: `PUT`,
						json: {
							"on":true
						}
					};
					//console.log(`on was false`);
				} else {
					console.log(`light state was not correct:`);
					return error;
				};
				request(options, function (error,response,body) {
					if (!error && response.statusCode == 200) {
						message.channel.send(`Light ${args[0]} toggled.`);
					} else {
						console.log(`Error accessing hue bridge to change light ${lightToChange}:`);
						return error;
					};
				});
			} else {
				console.log(`Error accessing Hue bridge to get light state:`);
				return error;
			};
		});
	} else {
		message.channel.send(`Sorry, I didn't recognise that.`);
		return;
	};
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`light`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
};
