const config = require("../config/config.json");
const chalk = require(`chalk`);

exports.run = (client,message,args) => {
	console.log(message.mentions.members.first());
	fs.writeFile(`./aaaaaaaa.json`, )
	//message.guild.members.get();
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`kick`,message.author.username,message.author.discriminator);
        }
}
