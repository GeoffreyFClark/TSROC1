type HelpFunction = () => string;

const buildHelpMsg: HelpFunction = () => {
    let helpMsg = 'The available commands are: ';
    helpMsg += '\n!help (this command you just ran)';
    helpMsg += ', !position';
    helpMsg += ', !approach <new airspace>';
    helpMsg += ', !loiter (autorepeats every 30min)';
    helpMsg += ', !loiteroff';
    helpMsg += ', !transit <new airspace>';
    helpMsg += ', !egress';
    helpMsg += ', !elev <new elevation>';
    helpMsg += ', !airspace';
    helpMsg += ', !repeat <text to be repeated> <interval in minutes>';
    helpMsg += ', !repeatoff';
    helpMsg += ', !join <#additionalchanneltojoin>'
    return helpMsg;
};

export default buildHelpMsg;