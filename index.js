const BN = require('bn.js')
const SHA3 = require('keccakjs')
const secp256k1 = require('secp256k1')

var sha3bits = 256;

/**
 * Signs hash 'string' with private key 'string' returns 'string' signed hash (hex)
 * @method signHash
 * @param {Buffer} hash
 * @param {Buffer} privateKey
 * @return {String}
 */
exports.signHash = function (hash, privateKey) {
    var bufferHash = new Buffer(padToEven(stripHexPrefix(hash)), 'hex'),
        bufferPrivateKey = new Buffer(padToEven(stripHexPrefix(privateKey)), 'hex');

    var sig = secp256k1.sign(bufferHash, bufferPrivateKey);
    var result = Buffer.concat([sig.signature, intToBuffer(sig.recovery)])
    return '0x' + result.toString('hex');
}

/**
* Calculates hash from input arguments returns 'string' hex
* @param {...*} var_args (hex string or number)
* @return {String}
*/
exports.getHash = function (var_args) {
    var args = arguments,
        buffer = [];

    for (var i = 0; i < args.length; i++) {
        var item = args[i];
        if (typeof item === 'string') {
            buffer.push(new Buffer(padToEven(stripHexPrefix(item)), 'hex'));
        }
        else if (typeof item === 'number') {
            buffer.push(new BN(item, 10).toBuffer('be', 32));
        }
        else {
            throw new Error('invalid type')
        }
    }
    var hash = new SHA3(sha3bits).update(Buffer.concat(buffer));
    return hash.digest('hex');
}

function isHexPrefixed(str) {
    return str.slice(0, 2) === '0x';
}

function padToEven(a) {
    if (a.length % 2) a = '0' + a;
    return a;
}

function stripHexPrefix(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return isHexPrefixed(str) ? str.slice(2) : str;
}

function isValidPrivate(privateKey) {
    return secp256k1.privateKeyVerify(privateKey);
}

function intToHex(i) {
    var hex = i.toString(16);
    if (hex.length % 2) {
        hex = '0' + hex;
    }
    return '0x' + hex;
}

function intToBuffer(i) {
    var hex = intToHex(i);
    return new Buffer(hex.slice(2), 'hex');
}
