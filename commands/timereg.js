const config = require("../config/config.json");
const chalk = require(`chalk`);
const fs = require(`fs`);
var timeRegister = require(`../config/timeregister.json`)

exports.run = (client,message,args) => {
    if (args[0] == "12" || args[0] == "24") {
        timeRegister[message.author.id] = args[0];
        fs.writeFile(`./soysource/timeregister.json`, JSON.stringify(timeRegister), function (err) {
            if (err) {
                console.log(`Error writing time register: ${err}`);
                return;
            } else {
                message.channel.send(`Registered ${args[0]} hour time to your account.`);
            };
        });
    } else {
        message.channel.send(`Please select either 12 or 24 hour time with \`${config.prefix}timereg [12/24]\`.`);
    };
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`timereg`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
};
