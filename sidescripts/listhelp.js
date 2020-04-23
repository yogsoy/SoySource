const helpdocs = require(`./helpdocs.json`);
for (meme in helpdocs) {
	console.log(helpdocs[meme].name);
}
