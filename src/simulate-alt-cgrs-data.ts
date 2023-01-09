type SimulateAltCGRSFunction = () => string;

let SimulateAltCGRS: SimulateAltCGRSFunction = () => {
    
    let makealtitude: number = (Math.floor(Math.random() * (50-36) + 36) ) * 500;

    let randnum: number = Math.floor(Math.random() * 99);
    let part1cgrs: string = randnum.toString();
    if (part1cgrs.length == 1) {
        part1cgrs = `0${[part1cgrs]}`;
    };

    function makeletters(length: number) {
        let result: string = '';
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return result.toString();
    };

    function makenumbers(length: number) {
        var result: string = '';
        var characters: string = '123456789';
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return result.toString();
    };

    let CGRSMsg: string = `Altitude ${makealtitude} | CGRS: ${part1cgrs}` + makeletters(2) + makenumbers(1);

    return CGRSMsg;
};

export default SimulateAltCGRS;