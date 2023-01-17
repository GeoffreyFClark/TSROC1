import {HelpMsg} from './help';
import {SimAltCGRSFunction, SimCurrentFLOnly} from './simulate-data'

let savedairspace: string;
let loiterSetting: boolean, loiterInterval: any;
let repeatSetting: boolean, repeatInterval: any, repeatMsg: string;

export function CommandHandler(client: any, from: any, to: any, text: string) {
    
    interface Options {
        command: string;
        argument: any;
    };
    
    let opts: Options = {
        command: String(text.split(' ')[0]).replace('!', '').trim(), //defines first word after '!' as command for .property of CommandTable
        argument: text.substring(String(text.split(' ')[0]).length).trim(), //defines text following !command as opts.argument
    };

    let CommandTable: { [key: string]: (options: Options) => void } = {}; //Creates object for adding command properties as functions that take options

    function LoiterOff() {
        loiterSetting = false;
        clearInterval(loiterInterval);
    };
    
    function RepeatOff() {
        repeatSetting = false;
        clearInterval(repeatInterval);
    };
    
    CommandTable.help = function(opts) {
        client.say(from, HelpMsg());
    };

    CommandTable.join = function(opts) {
        client.join(opts.argument);
    };
    
    CommandTable.airspace = function(opts) {
        savedairspace = opts.argument;
        client.say(to, `Airspace updated to: ${savedairspace}`);
    };

    CommandTable.position = function(opts) {
        client.say(to, SimAltCGRSFunction());
    };

    CommandTable.approach = function(opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Ingress | ${SimAltCGRSFunction()} | Desired CGRS: ${opts.argument}`);
    };

    CommandTable.elev = function(opts) {
        client.say(to, `<CALLSIGN> | Elev | Current CGRS: ${savedairspace} | FL${SimCurrentFLOnly()} for ${opts.argument}`);
    };

    CommandTable.transit = function(opts) {
        client.say(to, `<CALLSIGN> | Transit | ${savedairspace} to ${opts.argument} | FL${SimCurrentFLOnly()}`);
        savedairspace = opts.argument;
        LoiterOff();
    };

    CommandTable.egress = function(opts) {
        client.say(to, `<CALLSIGN> | Egress | ${savedairspace} | FL${SimCurrentFLOnly()}`);
        LoiterOff();
    };

    CommandTable.loiter = function(opts) { // To Do: Add check for whether last character(s) constitute number for interval, else error msg
        LoiterOff();

        const words = opts.argument.split(' ');
        const loiterFrequency = Number(words.pop());
        if (String(words).length > 1) {savedairspace = String(words)};

        client.say(to, `${loiterFrequency} minute auto-repeat until !egress !transit !loiteroff or new !loiter`);
        client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${SimCurrentFLOnly()}`);

        setTimeout(() => {
            loiterSetting = true;
            loiterInterval = setInterval(() => {
                client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${SimCurrentFLOnly()}`);
            }, loiterFrequency * 1000 * 60); //setTimeout is in milliseconds. *1000 for seconds and *60 for minutes
        }, 3000);
    }; 

    CommandTable.loiteroff = function(opts) {
        LoiterOff();
        client.say(to, "Loiter Auto-Repeat off.");
    };

    CommandTable.repeat = function(opts) { // To Do: Add check for whether last character(s) constitute number for interval, else error msg
        RepeatOff();

        const words = opts.argument.split(' ');
        const repeatFrequency = Number(words.pop());
        repeatMsg = words.join(' ');

        client.say(to, `${repeatFrequency} minute auto-repeat until !repeatoff or new !repeat\n${repeatMsg}`);

        setTimeout(() => {
            repeatSetting = true;
            repeatInterval = setInterval(() => {
                client.say(to, repeatMsg);
            }, repeatFrequency * 1000 * 60); //setTimeout is in milliseconds. *1000 for seconds and *60 for minutes
        }, 3000);
    };

    CommandTable.repeatoff = function(opts) {
        RepeatOff();
        client.say(to, "Auto-Repeat off.");
    };

    if (text && text.length > 2 && text[0] == '!') {
        if (typeof CommandTable[opts.command]  === 'function') {
            CommandTable[opts.command](opts);
        } else { client.say(to, "Invalid command") };
    };

};