const config = require("../config/config.json");
const chalk = require(`chalk`);
const fs = require(`fs`);

exports.run = (client,message,args) => {
    console.log(message.author.lastMessage.guild.channels);
    fs.writeFile(`./shit.txt`, JSON.stringify(message.author.lastMessage.guild.channels), (err) => {
        if (err) {
            console.log(err);
            return;
        };
    });
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`getshit`,message.author.username,message.author.discriminator);
        }
};
