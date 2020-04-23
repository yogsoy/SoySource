const config = require("../config/config.json");
const chalk = require(`chalk`);
const fixerURL = `http://data.fixer.io/api/latest?access_key=4f8d20d2ecc6c2535c13eaf12abd95ce&format=1`;
const request = require(`request`);
const fs = require(`fs`);

const doreq = true;

exports.run = (client,message,args) => {
	/*
	if (doreq == true) {
		request({uri:fixerURL,method:`GET`}, function (error,response,body) {
			if (!error && response.statusCode == 200) {
				// idfk
			} else {
				console.error(error);
			};
		});
	};
	*/
	message.channel.send("Sorry, this command isn't ready yet.");
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`curcon`,message.author.username,message.author.discriminator);
        }
};
