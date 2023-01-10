import {buildHelpMsg} from './help';
import {SimCurrentFL} from './simulate-FL-only'
import * as SimulateAltCGRS from './simulate-alt-cgrs-data'

export function commandHandler(client: any, from: any, to: any, text: string, message: any) {
    
    interface Options {
        command: string;
        argument: any;
        messageToSend: string;
    }
    
    let internalCommand: { [key: string]: (options: Options) => void } = {};
    
    let opts: Options = {
        command: text.split(" ")[0].replace("!", "").trim(),
        argument: text.substring(text.split(" ")[0].length).trim(),
        messageToSend: "",
    };

// module.exports = function(client, from, to, text, message) {

//     var internalCommand = {};// lookup table for internal commands
  
//     var opts = {
//       command: String(text.split(' ')[0]).replace('!', '').trim(),
//       argument: text.substring(String(text.split(' ')[0]).length).trim(),
//       messageToSend: ''
//     };

    let savedairspace: string;
    let loiterSetting: boolean, loiterInterval: number;
    let repeatSetting: boolean, repeatInterval: number, repeatMsg: string;

    internalCommand[opts.command](opts);

    function loiterOff() {
        loiterSetting = false;
        clearInterval(loiterInterval);
    };
    
    function loiterOn() {
        loiterSetting = true;
        setInterval(client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${SimCurrentFL})`), 15 * 1000);
    };

    function repeatOff() {
        repeatSetting = false;
        clearInterval(repeatInterval);
    };

    function repeatOn() {
        repeatSetting = true;
        setInterval(client.say(to, repeatMsg), repeatInterval * 1000);
    };


    internalCommand.help = function(opts) {
        client.say(to, buildHelpMsg.toString());
    };

    internalCommand.join = function(opts) {
        client.join(opts.argument);
    };
    
    internalCommand.airspace = function(opts) {
        savedairspace = opts.argument;
        client.say(to, `Airspace updated to: ${savedairspace}`);
    };

    internalCommand.position = function(opts) {
        client.say(to, SimulateAltCGRS.toString());
    };

    internalCommand.approach = function(opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Ingress | ${SimulateAltCGRS} | Desired CGRS: ${opts.argument}`);
    };

    internalCommand.elev = function(opts) {
        client.say(to, `<CALLSIGN> | Elev | Current CGRS: ${savedairspace} | FL${SimCurrentFL} for ${opts.argument}`);
    };

    internalCommand.transit = function(opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Transit | ${savedairspace} to ${opts.argument} | FL${SimCurrentFL}`);
        loiterOff();
    };

    internalCommand.egress = function(opts) {
        client.say(to, `<CALLSIGN> | Egress | ${savedairspace} | FL${SimCurrentFL}`);
        loiterOff();
    };

    internalCommand.loiter = function(opts) {
        loiterOff();
        if (opts.argument.length > 1) {savedairspace = opts.argument};

        client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${SimCurrentFL})`)

        client.say(to, "15 sec auto-repeat until !egress !transit !loiteroff or new !loiter");
        setTimeout(loiterOn, 3000);
    }; 
    

    internalCommand.repeat = function(opts) {
        repeatOff();

        // let words: Array<string> = opts.argument.substring( String(opts.argument.trim().split(' ')[0]).length+1 ).trim();
        // words = opts.argument.split(' ');
        // var repeatInterval: Number = Number(words.pop());
        // var repeatMsg = words;

        let words: string[] = opts.argument.split(' ');
        words.shift();
        repeatInterval = Number(words.pop());
        repeatMsg = words.join(' ');

        client.say(to, `${repeatInterval} minute auto-repeat until !repeatoff or new !repeat\n${repeatMsg}`);
        setTimeout(repeatOn, 3000);
    };

    internalCommand.repeatoff = function(opts) {
        repeatOff();
        client.say(to, "Auto-Repeat off.");
    };

};