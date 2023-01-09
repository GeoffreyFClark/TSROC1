import buildHelpMsg from './help';
import * as irc from 'irc';


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

    internalCommand.help = function(opts) {
        client.say(to, buildHelpMsg.toString());
    };

    internalCommand.join = (opts: Options) => {
        client.join(opts.argument);
    };
    
    internalCommand.airspace = (opts: Options) => {
        savedairspace = opts.argument;
        client.say(to, `Airspace updated to: ${savedairspace}`);
    };

};