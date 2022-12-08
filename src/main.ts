var irc = require('irc');
var server = "eu.chat4all.org"

var client = new irc.Client(server, 'nicknamebot', {
    channels: ['#mircbottest2'],
    port: 6667,
});

client.addListener("registered", function() {
    console.log("Bot is now registered with the server "+server);
  });
