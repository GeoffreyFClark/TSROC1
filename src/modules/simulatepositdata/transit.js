// ​Example 3: !transit
// Transiting to a new Airspace (CALLSIGN | TX | Current Airspace to New airspace | FLXXX)

// Approaching HOTZONE one would post (CALLSIGN | Ingress | FLXXX | Current Location | Desired Airspace)
// leaving atc control (FIR)
// once desired airspace set, sub for working airspace as well

function transitdata(){

    function makeletters(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result.toString();
    }

    function makenumbers(length) {
        var result           = '';
        var characters       = '123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result.toString();
    }

    var randnum = Math.floor(Math.random() * 99);

    var cgrsx = randnum.toString();

    if (cgrsx.length == 1) {
        cgrsx = "0" + cgrsx;
    }

    var makealtitude = (Math.floor(Math.random() * (50-36) + 36) ) * 5;
    var flightlevel = makealtitude.toString();

    var transitstring = "<CALLSIGN> | Transit | "

    // transitstring += flightlevel;
    // transitstring += ' | Current CGRS:';
    // transitstring += cgrsx; 
    // transitstring += makeletters(2);
    // transitstring += makenumbers(1);
    // transitstring += ' | Desired CGRS:';

    return transitstring;
}


module.exports = transitdata();


