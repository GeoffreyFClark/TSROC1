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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const help_1 = __importDefault(require("./help"));
const SimulateAltCGRS = __importStar(require("./simulate-alt-cgrs-data"));
const SimCurrentFL = __importStar(require("./simulate-FL-only"));
function commandHandler(client, from, to, text, message) {
    const internalCommand = {};
    let opts = {
        command: text.split(" ")[0].replace("!", "").trim(),
        argument: text.substring(text.split(" ")[0].length).trim(),
        messageToSend: "",
    };
    let savedairspace;
    let loiterSetting, loiterInterval;
    let repeatSetting, repeatInterval;
    internalCommand.help = function (opts) {
        client.say(to, help_1.default.toString());
    };
    internalCommand.join = (opts) => {
        client.join(opts.argument);
    };
    internalCommand.airspace = (opts) => {
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
        client.say(to, `<CALLSIGN> | Elev | Current CGRS: ${savedairspace} | FL${SimCurrentFL} for ${opts.argument}`);
    };
    internalCommand.transit = function (opts) {
        savedairspace = opts.argument;
        client.say(to, `<CALLSIGN> | Transit | ${savedairspace} to ${opts.argument} | FL${SimCurrentFL}`);
        loiterSetting = false;
        clearInterval(loiterInterval);
    };
    internalCommand.egress = function (opts) {
        client.say(to, `<CALLSIGN> | Egress | ${savedairspace} | FL${SimCurrentFL}`);
        loiterSetting = false;
        clearInterval(loiterInterval);
    };
}
exports.default = commandHandler;
;
//# sourceMappingURL=command-handler.js.map