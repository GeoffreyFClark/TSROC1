export function SimAltCGRSFunction(): string {
    let makealtitude: number = (Math.floor(Math.random() * (50-36) + 36) ) * 500;

    let randnum: number = Math.floor(Math.random() * 99);
    let part1cgrs: string = randnum.toString();
    if (part1cgrs.length == 1) {    //Prefaces with 0 if single digit random number generated
        part1cgrs = `0${[part1cgrs]}`;
    };

    function MakeLetters(length: number) {    //Random letter generator, parameter = number of letters to be generated
        let result: string = '';
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return result.toString();
    };

    function MakeNumbers(length: number) {    //Random number generator, parameter = number of digits to be generated
        var result: string = '';
        var characters: string = '123456789';
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return result.toString();
    };

    let CGRSMsg: string = `Altitude: ${makealtitude} | CGRS: ${part1cgrs}` + MakeLetters(2) + MakeNumbers(1);
    return CGRSMsg;
};


export function SimCurrentFLOnly(): string {
    let currentFL: string = ((Math.floor(Math.random() * (50-36) + 36) ) * 5).toString();
    return currentFL;
};