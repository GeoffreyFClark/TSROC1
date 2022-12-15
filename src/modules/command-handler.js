var fs = require('fs');
var help = require('./help.js');
var isChannel = require('./is-channel.js');
var clearModuleCaches = require('./clear-module-caches.js');
var isAdmin = require('./is-admin.js');

const spawn = require('child_process').spawn;

// import { cgrsfunction } from './simulatepositdata/cgrsdatasimulated.ts';

/*
 * Command handler
 * -----------------------------------------------------------------------------
 *
 * TODO:
 * - refactor the decision point (in the of this function)
 * - refactor the internal commands to use only arguments
 */
module.exports = function(client, from, to, text, message) {

  var internalCommand = {};// lookup table for internal commands

  var opts = {
    command: String(text.split(' ')[0]).replace('!', '').trim(),
    argument: text.substring(String(text.split(' ')[0]).length).trim(),
    messageToSend: ''
  }

  /*
   *
   * ---------------------------------------------------------------------------
   * basically stolen from:
   * http://fahad19.tumblr.com/post/39920378753/running-an-irc-bot-with-nodejs-locally
   */
  function externalCommand(opts) {
    if (fs.existsSync('./commands/' + opts.command + '.js')) { // check if we have an command file
      var output = require('../commands/' + opts.command + '.js')(client, from, to, text, message);
      if (output) {
        client.say(sendTo, output);
      }
    } else {
      client.say(sendTo, 'unknown command');
    }
  };

  /*
   * Standard IRC /join
   * ---------------------------------------------------------------------------
   */
  internalCommand.join = function(opts) {
    if (isAdmin(message.prefix)) {
      client.join(opts.argument);
    }
  };

  /*
   * Standard IRC /part
   * ---------------------------------------------------------------------------
   */
  internalCommand.part = function(opts) {
    if (isAdmin(message.prefix)) {
      if (text.split(' ')[1] != undefined && text.split(' ')[1].indexOf('#') > -1) {
        client.part(text.split(' ')[1]);
      } else {
        client.part(sendTo);
      }
    }
  };

  /*
   * Standard IRC /kick
   * ---------------------------------------------------------------------------
   */
  internalCommand.kick = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('KICK', sendTo, opts.argument.split(' ')[0], opts.argument.split(' ')[1] || '');
    }
  };

  /*
   * Convenience method for banning
   * ---------------------------------------------------------------------------
   */
  internalCommand.ban = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '+b', opts.argument);
    }
  };

  /*
   * Convenience method for unbanning
   * ---------------------------------------------------------------------------
   */
  internalCommand.unban = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '-b', opts.argument);
    }
  };

  /*
   * Speak
   * ---------------------------------------------------------------------------
   */
  internalCommand.say = function(opts) {
    if (isAdmin(message.prefix)) {
      if (isChannel(opts.argument)) {
        messageToSend = opts.argument.substring( String(opts.argument.trim().split(' ')[0]).length+1 ).trim();
      } else {
        messageToSend = opts.argument;
      }
      client.say(sendTo, messageToSend);
    }
  };

  internalCommand.position = function(opts) {
    var cgrsdatasimulated = require('./simulatepositdata/cgrsdatasimulated.js');
    client.say(sendTo, cgrsdatasimulated.toString());
    delete require.cache[require.resolve('./simulatepositdata/cgrsdatasimulated.js')]
  };

  globalThis.savedairspace;

  internalCommand.airspace = function(opts) {
    globalThis.savedairspace = opts.argument;
    var airspaceupdate = "Airspace updated to: "
    airspaceupdate += opts.argument;
    client.say(sendTo, airspaceupdate.toString());
  }

  internalCommand.approach = function(opts) {
      // if (isChannel(opts.argument)) {
      //   var savedairspace = opts.argument;
      // } else {
        if (opts.argument.length > 1) {
          var workingairspace = opts.argument;
          global.savedairspace = opts.argument;
        } else {
           var workingairspace = global.savedairspace;
        }
      // }
      var approachdata = require('./simulatepositdata/approach.js');
      var approachmessage = approachdata.concat(" ", workingairspace);
      client.say(sendTo, approachmessage.toString());
      delete require.cache[require.resolve('./simulatepositdata/approach.js')]
    }


  internalCommand.loiter = function(opts) {
    if (opts.argument.length > 1) {
      var workingairspace = opts.argument;
      global.savedairspace = opts.argument;
    } else {
       var workingairspace = global.savedairspace;
    }
    var loiterdata = require('./simulatepositdata/loiter.js');
    var loitermessage = loiterdata.concat(" ", workingairspace);

    var makealtitude = (Math.floor(Math.random() * (50-36) + 36) ) * 5;
    var flightlevel = makealtitude.toString();
    loitermessage += ' | FL';
    loitermessage += flightlevel;    

    client.say(sendTo, loitermessage.toString());
    delete require.cache[require.resolve('./simulatepositdata/approach.js')]
  }

  internalCommand.transit = function(opts) {
    var transitmessage = "<CALLSIGN> | Transit | "
    transitmessage += global.savedairspace;
    transitmessage += " to "
    transitmessage += opts.argument;
    global.savedairspace = opts.argument;
    transitmessage += " | FL"
    var makealtitude = (Math.floor(Math.random() * (50-36) + 36) ) * 5;
    transitmessage += makealtitude.toString();
    client.say(sendTo, transitmessage.toString());
  };

  internalCommand.egress = function(opts) {
    if (opts.argument.length > 1) {
      var egressairspace = opts.argument;
      global.savedairspace = opts.argument;
    } else {
       var egressairspace = global.savedairspace;
    }
    var egressdata = require('./simulatepositdata/egress.js');
    egressdata += egressairspace;
    client.say(sendTo, egressdata.toString());
    delete require.cache[require.resolve('./simulatepositdata/egress.js')]
  };

  internalCommand.elev = function(opts) {
    var elevmessage = "<CALLSIGN> | Elev | ";
    elevmessage += global.savedairspace;
    elevmessage += " | FL"
    var makealtitude = (Math.floor(Math.random() * (50-36) + 36) ) * 5;
    elevmessage += makealtitude.toString();
    elevmessage += " for "
    elevmessage += opts.argument;
    client.say(sendTo, elevmessage.toString());
  };


  // internalCommand.position = function(opts) {
  //   var pythonProcess = spawn('javascript', ['X:/CODING Projects/Air Force/airforce2/src/modules/simulatepositdata/cgrsdatasimulated.js']);
  //   pythonProcess.stdout.on('data', (data) => {
  //     client.say(sendTo, data) // Line to do something with the data returned from python script
  //    });
    // var acPositionData = fs.readFileSync('X:/CODING Projects/Air Force/airforce2/src/modules/simulatepositdata/temporarytextfile',
    // {encoding:'utf8', flag:'r'});
    // client.say(sendTo, acPositionData)

    //add code for error e.g. no data found
    // if (err.code === 'ENOENT') {
    //   console.log('File not found!');
    // } else {
    //   throw err;
    // }
  // }

  /*
   * Standard IRC /topic setter
   * ---------------------------------------------------------------------------
   */
  internalCommand.topic = function(opts) {
    if (isAdmin(message.prefix) && opts.argument.length > 0) {
      client.send('TOPIC', sendTo, opts.argument);
    }
  };

  /*
   * Standard IRC /op convenience method for mode +o
   * ---------------------------------------------------------------------------
   */
  internalCommand.op = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '+o', opts.argument);
    }
  };

  /*
   * Standard IRC /deop convenience method for mode -o
   * ---------------------------------------------------------------------------
   */
  internalCommand.deop = function(opts) {
    if (isAdmin(message.prefix)) {
      client.send('MODE', sendTo, '-o', opts.argument);
    }
  };

  /*
   * Standard IRC /mode
   * ---------------------------------------------------------------------------
   */
  internalCommand.mode = function(opts) {
    if (isAdmin(message.prefix)) {
      if (opts.argument.split(' ')[1] != undefined) {
        client.send('MODE', sendTo, opts.argument.split(' ')[0], opts.argument.split(' ')[1]);
      } else {
        client.send('MODE', sendTo, opts.argument.split(' ')[0]);
      }

    }
  };

  /*
   * Standard IRC /quit
   * ---------------------------------------------------------------------------
   */
  internalCommand.quit = function(opts) {
    if (isAdmin(message.prefix)) {
      client.disconnect("As you wish m'lord!", function(){
        process.exit();
      });
    } else {
      client.say(sendTo, 'Sorry mate, only bot admin can do that!');
    }
  };

  /*
   * Bot: Reload commands/observers/greetings/auto-ops
   * ---------------------------------------------------------------------------
   */
  internalCommand.reload = function(opts) {
    if (isAdmin(message.prefix)) {
      client.say(sendTo, clearModuleCaches());
    } else {
      client.say(sendTo, 'Sorry mate, only bot admin can do that!');
    }
  };

  /*
   * Bot: list available commands
   * ---------------------------------------------------------------------------
   */
  internalCommand.help = function(opts) {
    client.say(sendTo, help.toString());
  };

  /*
   * Decision point
   * ---------------------------------------------------------------------------
   * TODO: refactor
   */
  if (text && text.length > 2 && text[0] == '!') {

    var sendTo = from; // send privately

    if (isChannel(to)) {
      sendTo = to; // send publicly
    }

    // test if we have an internal/core command for it, if not try external
    if (typeof internalCommand[opts.command]  === 'function') {
      internalCommand[opts.command](opts);
    } else {
      externalCommand(opts);
    }
  }
};
