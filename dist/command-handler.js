"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const help_1 = __importDefault(require("./help"));
function commandHandler(client, from, to, text, message) {
    const internalCommand = {};
    const opts = {
        command: text.split(" ")[0].replace("!", "").trim(),
        argument: text.substring(text.split(" ")[0].length).trim(),
        messageToSend: "",
    };
    let savedairspace;
    let intervalSetting;
    let loiterInterval;
    let repeatSetting;
    let repeatInterval;
    internalCommand.help = function (opts) {
        client.say(to, help_1.default.toString());
    };
    internalCommand.join = (opts) => {
        client.join(opts.argument);
    };
    internalCommand.airspace = (opts) => {
        savedairspace = opts.argument;
        opts.messageToSend = `Airspace updated to: ${opts.argument}`;
        client.say(to, opts.messageToSend);
    };
}
exports.default = commandHandler;
;
//# sourceMappingURL=command-handler.js.map