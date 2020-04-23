const config = require(`../config/config.json`);
const chalk = require(`chalk`);
const timeRegister = require(`../config/timeregister.json`);

exports.run = (client,message,args) => {
	let date = message.createdAt;
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	// idk why date.getTimezoneOffset() returns a negative number, but it does
	let offset = -(date.getTimezoneOffset() * 60);
	let offsetHours = offset / 3600;
	//let timeUTC = date - offset;
	const timeList = require(`../resources/timelist.json`);

	// fix minutes
	if (minutes.toString().length == 1) {
		minutes = `0` + minutes;
	};

	// fix seconds
	if (seconds.toString().length == 1) {
		seconds = `0` + seconds;
	};

	// OK SO HERE'S MY ATTEMPT AT MAKING A GLOBAL FUNCTION TO CALCULATE IT
	var allTimes = ``;
	for (item in timeList) {
		var allTimes = allTimes + `, UTC${timeList[item]["UTC"]}`;
	};
	var allTimes = allTimes.slice(1);
	var timeCalc = {};
	var hourUTC = {};
	function getTime(request) {
		var ampm = ``;
		requestHours = hours - offsetHours + timeList[request]["UTC"];
		/*
			Ethan,

			Know that i had to do all of this shit just to implement 12/24 hour time based on what the user wants
		*/
		if (requestHours < 0) {
                        requestHours += 24;
                };
		if (timeRegister[message.author.id] == `12`) {
			ampm = ` AM`;
			if(requestHours > 12) {
				requestHours = requestHours - 12;
				ampm = ` PM`;
			}
		}
		if (requestHours.toString().length == 1) {
			requestHours = `0` + requestHours;
		};
		requestCalc = `${requestHours}:${minutes}:${seconds}${ampm}`;
		if (timeList[request]["UTC"] < 0) {
			var utcFormatted = timeList[request]["UTC"];
		} else {
			var utcFormatted = `+${timeList[request]["UTC"]}`;
		};
		var timeDesc = `**UTC${utcFormatted} (${timeList[request]["short"]}) Time:**\n${requestCalc}`;
		sendEmbed(timeDesc);
	};
	function getTimes() {
		var timeDesc = ``;
		var ampm = ``;
		for (offsetCurrent in timeList) {
			//console.log(offsetCurrent);
			hourUTC[offsetCurrent] = hours - offsetHours + timeList[offsetCurrent]["UTC"];
			//the shit to do 12/24 hour
			if(hourUTC[offsetCurrent] < 0) {
                                hourUTC[offsetCurrent] += 24;
                        }
			if (timeRegister[message.author.id] == `12`) {
				ampm = ` AM`;
	                        if(hourUTC[offsetCurrent] > 12) {
	                                hourUTC[offsetCurrent] -= 12;
	                                ampm = ` PM`;
	                        }
			}
			if (hourUTC[offsetCurrent].toString().length == 1) {
				hourUTC[offsetCurrent] = `0` + hourUTC[offsetCurrent];
			};
			timeCalc[offsetCurrent] = `${hourUTC[offsetCurrent]}:${minutes}:${seconds}${ampm}`;
		};

		// add all the times to the description field of the embed
		for (beepme in timeList) {
			var timeDesc = timeDesc + `\n**${beepme} (${timeList[beepme].short}) Time:**\n${timeCalc[beepme]}`;
		};
		//console.log(timeDesc);
		sendEmbed(timeDesc);
	};

	//determine whether to send full or specific time data
	if (args[0]) {
		var humanPlace = args.join(` `);
		var place = humanPlace.toLowerCase();
		var found = false;
		for (item in timeList) {
			if (timeList[item]["places"].includes(place) || timeList[item] == place) {
				getTime(item)
				var found = true;
			};
		};
		if (found == false) {
			message.channel.send(`Sorry, I can only calculate times for ${allTimes}.`)
		};
	} else {
		getTimes();
	};

	//send the embed
	function sendEmbed(timeDesc) {
		message.channel.send({embed: {
			color: config.embedcolour,
			author: {
				name: `${config.botname} Time Calculator`,
				icon_url: client.user.avatarURL
			},
			description: timeDesc,
			timestamp: new Date(),
			footer: {
				text: config.flavourtext
			}
		}});
	};

	// notify
        if (config.verbosecommands) {
                const log = require(`../commandlog.js`);
                log.run(`time`,message.author.username,message.author.discriminator, (args[0] ? args[0] : false));
        }
}
