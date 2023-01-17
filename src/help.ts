export function HelpMsg(): string {
    let helpText: string = 'Available Commands: ';
    helpText += '\n!help (the command you just ran)';
    helpText += '\n!position';
    helpText += '\n!approach <new airspace>';
    helpText += '\n!loiter <optional: new airspace, else current airspace stated> <interval in minutes>';
    helpText += '\n!loiteroff';
    helpText += '\n!transit <new airspace>';
    helpText += '\n!egress';
    helpText += '\n!elev <new elevation>';
    helpText += '\n!airspace <updated airspace>';
    helpText += '\n!repeat <text to be repeated> <interval in minutes>';
    helpText += '\n!repeatoff';
    helpText += '\n!join <#additionalchanneltojoin>'
    return helpText;
};