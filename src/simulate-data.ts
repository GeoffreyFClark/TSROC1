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

    function MakeNumbers(length: number) {    //Random digit generator that excludes 0, parameter = number of digits to be generated
        var result: string = '';
        var characters: string = '123456789';
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return result.toString();
    };

    let CGRSMsg: string = `Altitude: ${makealtitude} | CGRS: ${part1cgrs}` + MakeLetters(2) + MakeNumbers(1);
    return CGRSMsg; //Example string return: "Altitude: 24000 | CGRS: 12SR9"
};


export function SimCurrentFLOnly(): string {
    let currentFL: string = ((Math.floor(Math.random() * (50-36) + 36) ) * 5).toString();
    return currentFL; //Example string return: "240"
};

// ​Example 1: !approach
// Approaching HOTZONE one would post (CALLSIGN | Ingress | FLXXX | Current Location | Desired Airspace)
// leaving atc control (FIR)
// once desired airspace set, sub for working airspace as well

// ​Example 2: !loiter 
// Once the airplane reached its working Airspace (CALLSIGN | Est | Working Airspace | FLXXX)

// ​Example 3: !transit
// Transiting to a new Airspace (CALLSIGN | TX | Current Airspace to New airspace | FLXXX)

// ​Example 4: !egress
// RTB/exiting HOTZONE (CALLSIGN | Egress | Current Airspace | FLXXX)
// returning into atc control

// ​Example 5: !elev
// Changing Altitude (CALLSIGN | Elev | Current Airspace | FLXXX for FLXXX deconflicted with Callsigns sharing the same airspace)

//customizable command: 
// !1 !2 !3 !4 !5
// nameable, add on timer interval

//regex (regular expressions) text-pattern matching
//format error catching

// Don't sub TX or Elev, lets people know we are changing alt
// Randomized altitude, location, fix callsign

// local host port number local server

// docker linux vm image rocky ubuntu
// wsl windows subsystem for linux
// sysd relating to how to run a service


// format commands for real world applicability
// format for (not GARS) RANDOMIZED CGRS ##AA(up to 9# boxes)
// can scrape most data except for target location
// eg transit from 1 box to another box, position 1 box, loiter multiple sidebyside boxes
// local server 
// timer 
// post-presentation, linux vm 