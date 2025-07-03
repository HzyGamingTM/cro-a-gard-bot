const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require("./token.json");

const http = require("http");

const client = new Client({intents: [GatewayIntentBits.Guilds]})

client.on(Events.ClientReady, client => {
    console.log("Up")
});

client.login(token);

// fetch("https://g")

http.get({
    hostname: "growagarden.gg",
    port: 80,
    path: "/api/stock",
    agent: false,
}, res => {
    res.on("data", data => {
        
    });
    console.log(res);
}).on("error", e => {
    console.error("ERROR while requesting http object!")
    console.error(e);
})