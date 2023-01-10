"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHandler = void 0;
const help_1 = require("./help");
const simulate_FL_only_1 = require("./simulate-FL-only");
const SimulateAltCGRS = __importStar(require("./simulate-alt-cgrs-data"));
function commandHandler(client, from, to, text, message) {
    let internalCommand = {};
    let opts = {
        command: text.split(" ")[0].replace("!", "").trim(),
        argument: text.substring(text.split(" ")[0].length).trim(),
        messageToSend: "",
    };
    let savedairspace;
    let loiterSetting, loiterInterval;
    let repeatSetting, repeatInterval, repeatMsg;
    function loiterOff() {
        loiterSetting = false;
        clearInterval(loiterInterval);
    }
    ;
    function loiterOn() {
        loiterSetting = true;
        setInterval(client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${simulate_FL_only_1.SimCurrentFL})`), 15 * 1000);
    }
    ;
    function repeatOff() {
        repeatSetting = false;
        clearInterval(repeatInterval);
    }
    ;
    function repeatOn() {
        repeatSetting = true;
        setInterval(client.say(to, repeatMsg), repeatInterval * 1000);
    }
    ;
    internalCommand.help = function (opts) {
        client.say(to, help_1.buildHelpMsg.toString());
    };
    internalCommand.join = function (opts) {
        client.join(opts.argument);
    };
    internalCommand.airspace = function (opts) {
        savedairspace = opts.argument;
        client.say(to, `Airspace updated to: ${savedairspace}`);
    };
    internalCommand.position = function (opts) {
        client.say(to, SimulateAltCGRS.toString());
    };
    internalCommand.approach = function (opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Ingress | ${SimulateAltCGRS} | Desired CGRS: ${opts.argument}`);
    };
    internalCommand.elev = function (opts) {
        client.say(to, `<CALLSIGN> | Elev | Current CGRS: ${savedairspace} | FL${simulate_FL_only_1.SimCurrentFL} for ${opts.argument}`);
    };
    internalCommand.transit = function (opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Transit | ${savedairspace} to ${opts.argument} | FL${simulate_FL_only_1.SimCurrentFL}`);
        loiterOff();
    };
    internalCommand.egress = function (opts) {
        client.say(to, `<CALLSIGN> | Egress | ${savedairspace} | FL${simulate_FL_only_1.SimCurrentFL}`);
        loiterOff();
    };
    internalCommand.loiter = function (opts) {
        loiterOff();
        if (opts.argument.length > 1) {
            savedairspace = opts.argument;
        }
        ;
        client.say(to, `<CALLSIGN> | Est | ${savedairspace} | ${simulate_FL_only_1.SimCurrentFL})`);
        client.say(to, "15 sec auto-repeat until !egress !transit !loiteroff or new !loiter");
        setTimeout(loiterOn, 3000);
    };
    internalCommand.repeat = function (opts) {
        repeatOff();
        let words = opts.argument.split(' ');
        words.shift();
        repeatInterval = Number(words.pop());
        repeatMsg = words.join(' ');
        client.say(to, `${repeatInterval} minute auto-repeat until !repeatoff or new !repeat\n${repeatMsg}`);
        setTimeout(repeatOn, 3000);
    };
    internalCommand.repeatoff = function (opts) {
        repeatOff();
        client.say(to, "Auto-Repeat off.");
    };
}
exports.commandHandler = commandHandler;
;
//# sourceMappingURL=command-handler.js.map