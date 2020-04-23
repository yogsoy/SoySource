const config = require("../config/config.json");
const chalk = require(`chalk`);
const fs = require(`fs`);
var osuRegister = require(`../config/osuregister.json`)

exports.run = (client,message,args) => {
    if (args[0]) {
        //console.log(osuRegister);
        osuRegister[message.author.id] = args.join(` `);
        //console.log(osuRegister);
        fs.writeFile(`./soysource/config/osuregister.json`, JSON.stringify(osuRegister), function (err) {
            if (err) {
                console.log(`Error writing osu! register: ${err}`);
                return;
            } else {
                message.channel.send(`Assigned the osu! username ${args[0]} to your account.`);
            };
        });
    } else {
        message.channel.send(`Please provide an osu! username for me to register to you in the format \`${config.prefix}osureg [username]\`.`);
    };
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`osureg`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
};
