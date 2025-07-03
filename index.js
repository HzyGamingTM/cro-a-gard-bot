const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require("./token.json");

const worker = require("worker_threads");
const http = require("http");

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
]});

client.on(Events.ClientReady, client => {
    console.log("Up")
});

client.on(Events.MessageCreate, client => {

});

client.login(token);

async function main() {
    let fetched = await fetch("https://growagarden.gg/api/stock");
    let json = await fetched.json();
    
    
    let message = "In stock : "
    for (element of json["gearStock"]) {
        message += element['name'] + ", "
    }
    
    message = message.substr(0, message.length-2);
    console.log(message);
}

main()

const channelId = "1390370554393006372"
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = await client.channels.fetch(channelId);
  if (channel) {
    channel.send('This is an automated message to a specific channel.');
  } else {
    console.error('Channel not found!');
  }
});


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