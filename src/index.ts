import * as irc from 'irc'; 
import {buildHelpMsg} from './help';
import {commandHandler} from './command-handler';
// var commandHandler = require('./command-handler')

let config: { [key: string]: any } = require('../config/config.json');
let client = new irc.Client(config.server, config.userName, config);


client.addListener("registered", function() {
    console.log("Bot is now registered with the server "+config.server);
    buildHelpMsg();
});


client.addListener('error', function(message) {
    console.log('error: ', message);
});


client.addListener('message', function(from, to, text, message) {
    commandHandler(client, from, to, text, message); //handles commands starting with "!""
});

