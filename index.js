const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const token = process.env.DISCORD_BOT_TOKEN

const worker = require("worker_threads");
const http = require("http");

let lastData = {}

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
]});

client.on(Events.ClientReady, client => {
    console.log("Up")
});

client.on(Events.MessageCreate, client => {

});

client.login(token);
let message = "";

const channelId = "1390370554393006372"

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  checkApiUpdates("https://growagarden.gg/api/stock")
  setInterval(checkApiUpdates, 10000, "https://growagarden.gg/api/stock");
});


// funny(myjsondata)
function funny(jsonData) {
    message = "In stock : "
    for (element of jsonData["gearStock"]) {
        message += element['name'] + " (x" + element['value'] + "), "
    }
    
    message = message.substr(0, message.length-2);

    return message;
}


async function checkApiUpdates(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (JSON.stringify(data.gearStock) !== JSON.stringify(lastData.gearStock)) {
            lastData = data;
            message = funny(data);

            const channel = await client.channels.fetch(channelId);
            await channel.send(message);
        }
    } catch (error) {
        console.error('Error fetching API data:', error.message);
    }
}

const outputEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

//TODO: do this tmr https://discordjs.guide/popular-topics/embeds.html#embed-preview

/*
Types

 Stock: {
     name: String;
     value: number;
 }

 Seen: {
     name: String;
     emoji: String;
     seen: String;   // in date format, use `new Date(seen)`
 }

 Refreshed: {
     wasRefreshed: bool
     lastRefresh: number   // ms since 1970
     timeSinceRefresh: number  // also ms i think
     expectigUpdate: bool
 }

Object map
 - easterStock: [Stock]
 - gearStock: [Stock]
 - eggStock: [Stock]
 - nightStock: [Stock]
 - eventStock: [Stock]
 - cosmeticsStock: [Stock]
 - seedsStock: [Stock]
 - lastSeen
     - Seeds: [Seen]
     - Gears: [Seen]
     - Weather: [Seen]
     - Eggs: [Seen]
 - restockTimers        // im guessing these are in seconds? or ms? ms seems more reasonable cuz "honey" was "1522436"
     - seeds: number
     - gears: number
     - eggs: number
     - honey: number
     - cosmetics: number
 - categoryRefreshStatus
     - seeds: Refreshed
     - gears: Refreshed
     - eggs: Refreshed
     - honey: Refreshed
     - cosmetics: Refreshed
 - timerCalculatedAt: number    // epoch ms
 - serverStartTime: number      // epoch ms also
 - lastApiFetch: number         // epoch ms
 - nextScheduledFetch: number   // also epoch ms
 - imageData: { name: String, url: String }
*/
/*
http.get({
    hostname: "growagarden.gg",
    port: 80,
    path: "/api/stock",
    agent: false,
}, res => {
    json_data = ""
    res.on("data", data => {
        
    });
    console.log(res);
}).on("error", e => {
    console.error("ERROR while requesting http object!")
    console.error(e);
})

*/