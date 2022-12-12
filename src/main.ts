var irc = require('irc');
var fs = require('fs');

var config  = require('./config.json');
var commandHandler = require('./modules/command-handler.js');
var observerHandler = require('./modules/observer-handler.js');
var help = require('./modules/help.js');
var autoop = require('./modules/autoop.js');
var greetings = require('./modules/greetings.js');

var client = new irc.Client(config.server, config.userName, config);

client.addListener("registered", function() {
    console.log("Bot is now registered with the server "+config.server);
    help.buildString();
  });
  
  
  // Error handler
  client.addListener('error', function(message) {
    console.log('error: ', message);
  });
  
  
  // Listen for messages
  client.addListener('message', function(from, to, text, message) {
  
    //handles commands starting with "!""
    commandHandler(client, from, to, text, message);
  
    //listens for certain keywords on conversatios etc and acts on them
    //observerHandler(client, from, to, text, message);
  
  });
  
  
  // Listen for joins
  client.addListener("join", function(channel, nick, message) {
  
    greetings(client, channel, nick, message);
    autoop(client, channel, nick, message);
  
  });

  
// ​Example 1: 
// Approaching HOTZONE one would post (CALLSIGN | Ingress | FLXXX | Current Location | Desired Airspace)

// ​Example 2: 
//Once the airplane reached its working Airspace (CALLSIGN | Est | Working Airspace | FLXXX)

// ​Example 3: 
// Transiting to a new Airspace (CALLSIGN | TX | Current Airspace to New airspace | FLXXX)

// ​Example 4: 
// RTB/exiting HOTZONE (CALLSIGN | Egress | Current Airspace | FLXXX)

// ​Example 5: 
//Changing Altitude (CALLSIGN | Elev | Current Airspace | FLXXX for FLXXX deconflicted with Callsigns sharing the same airspace)