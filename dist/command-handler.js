"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const help_1 = require("./help");
const simulate_data_1 = require("./simulate-data");
const userData = {};
function CommandHandler(client, from, to, text) {
    ;
    let opts = {
        command: String(text.split(' ')[0]).replace('!', '').trim(),
        argument: text.substring(String(text.split(' ')[0]).length).trim(),
    };
    let CommandTable = {};
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
    }
    ;
    function LoiterOff() {
        user.loiterSetting = false;
        clearInterval(user.loiterInterval);
        user.loiterInterval = null;
    }
    ;
    function RepeatOff() {
        user.repeatSetting = false;
        clearInterval(user.repeatInterval);
        user.repeatInterval = null;
    }
    ;
    CommandTable.help = function (opts) {
        client.say(from, (0, help_1.HelpMsg)());
    };
    CommandTable.join = function (opts) {
        client.join(opts.argument);
    };
    CommandTable.airspace = function (opts) {
        user.savedAirspace = opts.argument;
        client.say(to, `${from} | Airspace updated to: ${user.savedAirspace}`);
    };
    CommandTable.position = function (opts) {
        client.say(to, `${from} | ${(0, simulate_data_1.SimAltCGRSFunction)()}`);
    };
    CommandTable.approach = function (opts) {
        user.savedAirspace = opts.argument;
        client.say(to, `${from} | <CALLSIGN> | Ingress | ${(0, simulate_data_1.SimAltCGRSFunction)()} | Desired CGRS: ${opts.argument}`);
    };
    CommandTable.elev = function (opts) {
        client.say(to, `${from} | <CALLSIGN> | Elev | Current CGRS: ${user.savedAirspace} | FL${(0, simulate_data_1.SimCurrentFLOnly)()} for ${opts.argument}`);
    };
    CommandTable.transit = function (opts) {
        client.say(to, `${from} | <CALLSIGN> | Transit | ${user.savedAirspace} to ${opts.argument} | FL${(0, simulate_data_1.SimCurrentFLOnly)()}`);
        user.savedAirspace = opts.argument;
        LoiterOff();
    };
    CommandTable.egress = function (opts) {
        client.say(to, `${from} | <CALLSIGN> | Egress | ${user.savedAirspace} | FL${(0, simulate_data_1.SimCurrentFLOnly)()}`);
        LoiterOff();
    };
    CommandTable.loiter = function (opts) {
        LoiterOff();
        const words = opts.argument.split(' ');
        const loiterFrequency = words.pop();
        if (isNaN(Number(loiterFrequency))) {
            client.say(to, 'Error: loiter frequency must be a number');
            client.say(to, "Please append a time interval for auto-repetition. Format: !loiter <optional new airspace> <repeat interval in minutes>");
            return;
        }
        ;
        if (!isNaN(loiterFrequency)) {
            if (String(words).length > 1) {
                user.savedAirspace = String(words);
            }
            ;
            client.say(to, `${loiterFrequency} minute auto-repeat until !egress !transit !loiteroff or new !loiter`);
            client.say(to, `${from} | <CALLSIGN> | Est | ${user.savedAirspace} | FL${(0, simulate_data_1.SimCurrentFLOnly)()}`);
            setTimeout(() => {
                user.loiterSetting = true;
                user.loiterInterval = setInterval(() => {
                    client.say(to, `${from} | <CALLSIGN> | Est | ${user.savedAirspace} | FL${(0, simulate_data_1.SimCurrentFLOnly)()}`);
                }, loiterFrequency * 1000 * 60);
            }, 3000);
        }
        ;
    };
    CommandTable.loiteroff = function (opts) {
        LoiterOff();
        client.say(to, `${from}'s Loiter Auto-Repeat off.`);
    };
    CommandTable.repeat = function (opts) {
        RepeatOff();
        const words = opts.argument.split(' ');
        const repeatFrequency = words.pop();
        user.repeatMsg = words.join(' ');
        if (isNaN(Number(repeatFrequency))) {
            client.say(to, 'Error: repeat frequency must be a number');
            client.say(to, "Please append a time interval for auto-repetition. Format: !repeat <text to be repeated> <interval in minutes>");
            return;
        }
        ;
        if (!isNaN(Number(repeatFrequency))) {
            client.say(to, `${repeatFrequency} minute auto-repeat until !repeatoff or new !repeat\n${user.repeatMsg}`);
            setTimeout(() => {
                user.repeatSetting = true;
                user.repeatInterval = setInterval(() => {
                    client.say(to, `${from} | ${user.repeatMsg}`);
                }, repeatFrequency * 1000 * 60);
            }, 3000);
        }
        ;
    };
    CommandTable.repeatoff = function (opts) {
        RepeatOff();
        client.say(to, `${from}'s Auto-Repeat off.`);
    };
    if (text && text.length > 2 && text[0] == '!') {
        if (typeof CommandTable[opts.command] === 'function') {
            CommandTable[opts.command](opts);
        }
        else {
            client.say(to, "Invalid command");
        }
        ;
    }
    ;
}
exports.CommandHandler = CommandHandler;
;
//# sourceMappingURL=command-handler.js.map