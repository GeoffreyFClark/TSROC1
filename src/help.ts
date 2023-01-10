export function buildHelpMsg(): string {
    let helpMsg = 'The available commands are: ';
    helpMsg += '\n!help (this command you just ran)';
    helpMsg += ', !position';
    helpMsg += ', !approach <new airspace>';
    helpMsg += ', !loiter <optional: new airspace, else current airspace stated> (autorepeats every 30min)';
    helpMsg += ', !loiteroff';
    helpMsg += ', !transit <new airspace>';
    helpMsg += ', !egress';
    helpMsg += ', !elev <new elevation>';
    helpMsg += ', !airspace <updated airspace>';
    helpMsg += ', !repeat <text to be repeated> <interval in minutes>';
    helpMsg += ', !repeatoff';
    helpMsg += ', !join <#additionalchanneltojoin>'
    return helpMsg;
};