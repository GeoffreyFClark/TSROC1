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
const irc = __importStar(require("irc"));
const help_1 = require("./help");
const command_handler_1 = require("./command-handler");
let config = require('../config/config.json');
let client = new irc.Client(config.server, config.userName, config);
client.addListener("registered", function () {
    console.log("Bot is now registered with the server " + config.server);
    (0, help_1.buildHelpMsg)();
});
client.addListener('error', function (message) {
    console.log('error: ', message);
});
client.addListener('message', function (from, to, text, message) {
    (0, command_handler_1.commandHandler)(client, from, to, text, message);
});
//# sourceMappingURL=index.js.map