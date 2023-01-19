"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const help_1 = require("./help");
const simulate_data_1 = require("./simulate-data");
let savedairspace;
let loiterSetting, loiterInterval;
let repeatSetting, repeatInterval, repeatMsg;
function CommandHandler(client, from, to, text) {
    ;
    let opts = {
        command: String(text.split(' ')[0]).replace('!', '').trim(),
        argument: text.substring(String(text.split(' ')[0]).length).trim(),
    };
    let CommandTable = {};
    function LoiterOff() {
        loiterSetting = false;
        clearInterval(loiterInterval);
    }
    ;
    function RepeatOff() {
        repeatSetting = false;
        clearInterval(repeatInterval);
    }
    ;
    CommandTable.help = function (opts) {
        client.say(from, (0, help_1.HelpMsg)());
    };
    CommandTable.join = function (opts) {
        client.join(opts.argument);
    };
    CommandTable.airspace = function (opts) {
        savedairspace = opts.argument;
        client.say(to, `Airspace updated to: ${savedairspace}`);
    };
    CommandTable.position = function (opts) {
        client.say(to, (0, simulate_data_1.SimAltCGRSFunction)());
    };
    CommandTable.approach = function (opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Ingress | ${(0, simulate_data_1.SimAltCGRSFunction)()} | Desired CGRS: ${opts.argument}`);
    };
    CommandTable.elev = function (opts) {
        client.say(to, `<CALLSIGN> | Elev | Current CGRS: ${savedairspace} | FL${(0, simulate_data_1.SimCurrentFLOnly)()} for ${opts.argument}`);
    };
    CommandTable.transit = function (opts) {
        client.say(to, `<CALLSIGN> | Transit | ${savedairspace} to ${opts.argument} | FL${(0, simulate_data_1.SimCurrentFLOnly)()}`);
        savedairspace = opts.argument;
        LoiterOff();
    };
    CommandTable.egress = function (opts) {
        client.say(to, `<CALLSIGN> | Egress | ${savedairspace} | FL${(0, simulate_data_1.SimCurrentFLOnly)()}`);
        LoiterOff();
    };
    CommandTable.loiter = function (opts) {
        LoiterOff();
        const words = opts.argument.split(' ');
        const loiterFrequency = words.pop();
        if (typeof loiterFrequency === "number") {
            if (String(words).length > 1) {
                savedairspace = String(words);
            }
            ;
            client.say(to, `${loiterFrequency} minute auto-repeat until !egress !transit !loiteroff or new !loiter`);
            client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${(0, simulate_data_1.SimCurrentFLOnly)()}`);
            setTimeout(() => {
                loiterSetting = true;
                loiterInterval = setInterval(() => {
                    client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${(0, simulate_data_1.SimCurrentFLOnly)()}`);
                }, loiterFrequency * 1000 * 60);
            }, 3000);
        }
        else {
            client.say(to, "Please append a time interval for auto-repetition. Format: !loiter <optional new airspace> <repeat interval in minutes>");
        }
        ;
    };
    CommandTable.loiteroff = function (opts) {
        LoiterOff();
        client.say(to, "Loiter Auto-Repeat off.");
    };
    CommandTable.repeat = function (opts) {
        RepeatOff();
        const words = opts.argument.split(' ');
        const repeatFrequency = words.pop();
        repeatMsg = words.join(' ');
        if (typeof repeatFrequency === "number") {
            client.say(to, `${repeatFrequency} minute auto-repeat until !repeatoff or new !repeat\n${repeatMsg}`);
            setTimeout(() => {
                repeatSetting = true;
                repeatInterval = setInterval(() => {
                    client.say(to, repeatMsg);
                }, repeatFrequency * 1000 * 60);
            }, 3000);
        }
        else {
            client.say(to, "Please append a time interval for auto-repetition. Format: !loiter <optional new airspace> <repeat interval in minutes>");
        }
        ;
    };
    CommandTable.repeatoff = function (opts) {
        RepeatOff();
        client.say(to, "Auto-Repeat off.");
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