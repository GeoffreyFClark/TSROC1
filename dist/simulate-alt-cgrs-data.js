"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let SimulateAltCGRS = () => {
    let makealtitude = (Math.floor(Math.random() * (50 - 36) + 36)) * 500;
    let randnum = Math.floor(Math.random() * 99);
    let part1cgrs = randnum.toString();
    if (part1cgrs.length == 1) {
        part1cgrs = `0${[part1cgrs]}`;
    }
    ;
    function makeletters(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        ;
        return result.toString();
    }
    ;
    function makenumbers(length) {
        var result = '';
        var characters = '123456789';
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        ;
        return result.toString();
    }
    ;
    let CGRSMsg = `Altitude: ${makealtitude} | CGRS: ${part1cgrs}` + makeletters(2) + makenumbers(1);
    return CGRSMsg;
};
exports.default = SimulateAltCGRS;
//# sourceMappingURL=simulate-alt-cgrs-data.js.map