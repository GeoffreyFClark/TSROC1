var irc = require('irc');
var client = new irc.Client('eu.chat4all.org', 'potato', {
    channels: ['#mircbottest2'],
    port: 6667,
});

console.log('Hello World');

client.say('#Chess', "I'm a bot!");

test