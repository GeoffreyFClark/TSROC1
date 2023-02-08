import {HelpMsg} from './help';
import {SimAltCGRSFunction, SimCurrentFLOnly} from './simulate-data'

const userData: { [key: string]: { 
    savedAirspace: string, 
    loiterSetting: boolean, 
    loiterInterval: any, 
    repeatSetting: boolean, 
    repeatInterval: any, 
    repeatMsg: string } 
} = {}; //Creates empty dictionary to store user data


export function CommandHandler(client: any, from: any, to: any, text: string) {
    
    interface Options {
        command: string;
        argument: any;
    }; //Creates options interface type
    
    let opts: Options = {
        command: String(text.split(' ')[0]).replace('!', '').trim(), //defines first word after '!' as command for .property of CommandTable
        argument: text.substring(String(text.split(' ')[0]).length).trim(), //defines text following !command as opts.argument
    }; 

    let CommandTable: { [key: string]: (options: Options) => void } = {}; //Creates object for adding command properties as functions that take options

    let user = userData[from];
    if (!user) {
        user = {
            savedAirspace: '',
            loiterSetting: false,
            loiterInterval: null,
            repeatSetting: false,
            repeatInterval: null,
            repeatMsg: ''
        };
        userData[from] = user;
    }; //Adds new users to user dictionary

    function LoiterOff() {
        user.loiterSetting = false;
        clearInterval(user.loiterInterval);
        user.loiterInterval = null;
    };
    
    function RepeatOff() {
        user.repeatSetting = false;
        clearInterval(user.repeatInterval);
        user.repeatInterval = null;
    };
    
    CommandTable.help = function(opts) {
        client.say(from, HelpMsg());
    };

    CommandTable.join = function(opts) {
        client.join(opts.argument);
    };
    
    CommandTable.airspace = function(opts) {
        user.savedAirspace = opts.argument;
        client.say(to, `${from} | Airspace updated to: ${user.savedAirspace}`);
    };

    CommandTable.position = function(opts) {
        client.say(to, `${from} | ${SimAltCGRSFunction()}`);
    };

    CommandTable.approach = function(opts) {
        user.savedAirspace = opts.argument;
        client.say(to, `${from} | <CALLSIGN> | Ingress | ${SimAltCGRSFunction()} | Desired CGRS: ${opts.argument}`);
    };

    CommandTable.elev = function(opts) {
        client.say(to, `${from} | <CALLSIGN> | Elev | Current CGRS: ${user.savedAirspace} | FL${SimCurrentFLOnly()} for ${opts.argument}`);
    };

    CommandTable.transit = function(opts) {
        client.say(to, `${from} | <CALLSIGN> | Transit | ${user.savedAirspace} to ${opts.argument} | FL${SimCurrentFLOnly()}`);
        user.savedAirspace = opts.argument;
        LoiterOff();
    };

    CommandTable.egress = function(opts) {
        client.say(to, `${from} | <CALLSIGN> | Egress | ${user.savedAirspace} | FL${SimCurrentFLOnly()}`);
        LoiterOff();
    };

    CommandTable.loiter = function(opts) { 
        LoiterOff();

        const words = opts.argument.split(' ');
        const loiterFrequency = words.pop(); //Saves last word as repeatFrequency (must be number)

        if (isNaN(Number(loiterFrequency))) {
            client.say(to, 'Error: loiter frequency must be a number');
            client.say(to, "Please append a time interval for auto-repetition. Format: !loiter <optional new airspace> <repeat interval in minutes>");
            return;
        }; //Error handler that checks if repeatFrequency is a number

        if (!isNaN(loiterFrequency)) {
            if (String(words).length > 1) {user.savedAirspace = String(words)}; //Saves new airspace if specified

            client.say(to, `${loiterFrequency} minute auto-repeat until !egress !transit !loiteroff or new !loiter`);
            client.say(to, `${from} | <CALLSIGN> | Est | ${user.savedAirspace} | FL${SimCurrentFLOnly()}`);

            setTimeout(() => {
                user.loiterSetting = true;
                user.loiterInterval = setInterval(() => {
                    client.say(to, `${from} | <CALLSIGN> | Est | ${user.savedAirspace} | FL${SimCurrentFLOnly()}`);
                }, loiterFrequency * 1000 * 60); //setTimeout is in milliseconds. *1000 for seconds and *60 for minutes
            }, 3000); //Additional 3 second delayed activation helps with server latency in some situations
        };
    }; 

    CommandTable.loiteroff = function(opts) {
        LoiterOff();
        client.say(to, `${from}'s Loiter Auto-Repeat off.`);
    };

    CommandTable.repeat = function(opts) { 
        RepeatOff();

        const words = opts.argument.split(' ');
        const repeatFrequency = words.pop(); //Saves last word as repeatFrequency (must be number)
        user.repeatMsg = words.join(' ');

        if (isNaN(Number(repeatFrequency))) {
            client.say(to, 'Error: repeat frequency must be a number');
            client.say(to, "Please append a time interval for auto-repetition. Format: !repeat <text to be repeated> <interval in minutes>");
            return;
        }; //Error handler that checks if repeatFrequency is a number

        if (!isNaN(Number(repeatFrequency))) {
            client.say(to, `${repeatFrequency} minute auto-repeat until !repeatoff or new !repeat\n${user.repeatMsg}`);

            setTimeout(() => {
                user.repeatSetting = true;
                user.repeatInterval = setInterval(() => {
                    client.say(to, `${from} | ${user.repeatMsg}`);
                }, repeatFrequency * 1000 * 60); //setTimeout is in milliseconds. *1000 for seconds and *60 for minutes
            }, 3000); //Additional 3 second delayed activation helps with server latency in some situations
        };
    };

    CommandTable.repeatoff = function(opts) {
        RepeatOff();
        client.say(to, `${from}'s Auto-Repeat off.`);
    };

    if (text && text.length > 2 && text[0] == '!') {
        if (typeof CommandTable[opts.command]  === 'function') {
            CommandTable[opts.command](opts);
        } else { client.say(to, "Invalid command") };
    }; //Executes command if it exists, otherwise responds with "Invalid Command"

};