import buildHelpMsg from './help';
import * as irc from 'irc';


export default function commandHandler(client: any, from: any, to: any, text: string, message: any) {
    
    interface Options {
    command: string;
    argument: string;
    messageToSend: string;
    }
    
    const internalCommand: { [key: string]: (options: Options) => void } = {};
    
    const opts: Options = {
    command: text.split(" ")[0].replace("!", "").trim(),
    argument: text.substring(text.split(" ")[0].length).trim(),
    messageToSend: "",
    };

    let savedairspace: string;

    let intervalSetting:string;
    let loiterInterval:string;

    let repeatSetting:string;
    let repeatInterval:string;

    internalCommand.help = function(opts) {
        client.say(to, buildHelpMsg.toString());
      };

    internalCommand.join = (opts: Options) => {
        client.join(opts.argument);
    };
    
    internalCommand.airspace = (opts: Options) => {
    savedairspace = opts.argument;
    opts.messageToSend = `Airspace updated to: ${opts.argument}`;
    client.say(to, opts.messageToSend);
    };

};