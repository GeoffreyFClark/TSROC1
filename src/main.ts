var irc = require('irc');
var fs = require('fs');

var config  = require('./config.json');
var commandHandler = require('./modules/command-handler.js');
var observerHandler = require('./modules/observer-handler.js');
var help = require('./modules/help.js');
var autoop = require('./modules/autoop.js');
var greetings = require('./modules/greetings.js');
var cgrsdatasimulated = require('./modules/simulatepositdata/cgrsdatasimulated.js')

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

  
// ​Example 1: !approach
// Approaching HOTZONE one would post (CALLSIGN | Ingress | FLXXX | Current Location | Desired Airspace)
// leaving atc control (FIR)
// once desired airspace set, sub for working airspace as well

// ​Example 2: !loiter 
// Once the airplane reached its working Airspace (CALLSIGN | Est | Working Airspace | FLXXX)

// ​Example 3: !transit
// Transiting to a new Airspace (CALLSIGN | TX | Current Airspace to New airspace | FLXXX)

// ​Example 4: !egress
// RTB/exiting HOTZONE (CALLSIGN | Egress | Current Airspace | FLXXX)
// returning into atc control

// ​Example 5: !elev
// Changing Altitude (CALLSIGN | Elev | Current Airspace | FLXXX for FLXXX deconflicted with Callsigns sharing the same airspace)

// Don't sub TX or Elev, lets people know we are changing alt
// Randomized altitude, location, fix callsign

// local host port number local server

// docker linux vm image rocky ubuntu something free and popular
// wsl windows subsystem for linux
// sysd relating to how to run a service


// TO DO:
// format commands for real world applicability
// format for (not GARS) RANDOMIZED CGRS ##AA(up to 9# boxes)
// can scrape most data except for target location
// eg transit from 1 box to another box, position 1 box, loiter multiple sidebyside boxes
// set up local server 
// timer (30 sec) 
// post-presentation, linux vm 