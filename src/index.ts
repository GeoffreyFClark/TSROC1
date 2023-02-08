import * as irc from 'irc'; 
import {CommandHandler} from './command-handler';

let config: { [key: string]: any } = require('../config/config.json');
let client = new irc.Client(config.server, config.userName, config);


client.addListener("registered", function() {
    console.log("Bot is now registered with the server "+config.server);
});


client.addListener('error', function(message) {
    console.log('error: ', message);
});


client.addListener('message', function(from, to, text) {
    CommandHandler(client, from, to, text); //handles commands starting with "!"
});

//To Do: Add JSON Cavok API Query, UI, variables to substitute in JASON Cavok info and CallSign of who you're talking to