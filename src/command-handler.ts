import buildHelpMsg from './help';
import * as irc from 'irc';
import * as SimulateAltCGRS from './simulate-alt-cgrs-data'
import * as SimCurrentFL from './simulate-FL-only'

export default function commandHandler(client: any, from: any, to: any, text: string, message: any) {
    
    interface Options {
    command: string;
    argument: string;
    messageToSend: string;
    }
    
    const internalCommand: { [key: string]: (options: Options) => void } = {};
    
    let opts: Options = {
    command: text.split(" ")[0].replace("!", "").trim(),
    argument: text.substring(text.split(" ")[0].length).trim(),
    messageToSend: "",
    };

    let savedairspace: string;
    let loiterSetting: boolean, loiterInterval: string;
    let repeatSetting: boolean, repeatInterval: string;

    internalCommand.help = function(opts: Options) {
        client.say(to, buildHelpMsg.toString());
    };

    internalCommand.join = (opts: Options) => {
        client.join(opts.argument);
    };
    
    internalCommand.airspace = (opts: Options) => {
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

        loiterSetting = false;
        clearInterval(loiterInterval);
    };

    internalCommand.egress = function(opts) {
        client.say(to, `<CALLSIGN> | Egress | ${savedairspace} | FL${SimCurrentFL}`);
    
        loiterSetting = false;
        clearInterval(loiterInterval);
    };


};