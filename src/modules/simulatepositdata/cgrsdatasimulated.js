var randnum = Math.floor(Math.random() * 100);

var cgrs = randnum.toString();

if (cgrs.length == 1) {
    cgrs = "0" + cgrs;
}

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

cgrs = cgrs + makeletters(2) + makenumbers(3);

// console.log(cgrs);

function stringify (cgrs) {
    console.log(Object.prototype.toString.call(cgrs));
}

return cgrs;