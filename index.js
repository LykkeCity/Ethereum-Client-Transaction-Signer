Object.assign = Object.assign || require('object.assign');
var uuid = require('node-uuid');
var ethWallet = require('ethereumjs-wallet');
var ethUtil = require('ethereumjs-util');
var Transaction = require('ethereumjs-tx');
var BN = ethUtil.BN;

var sha3bits = 256;
var guidRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Signs transaction 'string' with private key 'string' returns 'string' signed transaction (hex)
 * @method signTransaction
 * @param {String} transaction
 * @param {String} privateKey
 * @return {String}
 */
exports.signTransaction = function (transaction, privateKey) {
    var bufferTransaction = ethUtil.toBuffer(ethUtil.addHexPrefix(transaction)),
        bufferPrivateKey = ethUtil.toBuffer(ethUtil.addHexPrefix(privateKey)),
        transactionHash = ethUtil.rlphash(bufferTransaction);
    var tx = new Transaction(bufferTransaction);
    tx.sign(bufferPrivateKey);
    var serializedTx = tx.serialize().toString('hex');

    //var sig = ethUtil.ecsign(transactionHash, bufferPrivateKey);
    //var result = ethUtil.toRpcSig(sig.v + 27, sig.r, sig.s);
    return serializedTx;// transaction + result;
}


/**
 * Signs hash 'string' with private key 'string' returns 'string' signed hash (hex)
 * @method signHash
 * @param {Buffer} hash
 * @param {Buffer} privateKey
 * @return {String}
 */
exports.signHash = function(hash, privateKey) {
    var bufferHash = ethUtil.toBuffer(ethUtil.addHexPrefix(hash)),
        bufferPrivateKey = ethUtil.toBuffer(ethUtil.addHexPrefix(privateKey));

    var sig = ethUtil.ecsign(bufferHash, bufferPrivateKey);
    var result = ethUtil.toRpcSig(sig.v + 27, sig.r, sig.s);
    return ethUtil.addHexPrefix(result);
}

/**
 * Calculates hash from input arguments returns 'string' hex
 * @param {...*} var_args (hex string or number)
 * @return {String}
 */
exports.getHash = function(var_args) {
    var args = arguments,
        buffer = [];

    for (var i = 0; i < args.length; i++) {
        var item = args[i];
        if (typeof item === 'string') {
            if (new RegExp(guidRegexp).test(item)) {
                buffer.push(guidToBuffer(item));
            } else {
                buffer.push(ethUtil.toBuffer(ethUtil.addHexPrefix(item)));
            }
        } else if (typeof item === 'number') {
            buffer.push(new BN(item, 10).toArrayLike(Buffer, 'be', 32));
        } else {
            throw new Error('invalid type')
        }
    }
    return ethUtil.bufferToHex(ethUtil.sha3(Buffer.concat(buffer), sha3bits));
}

/**
 * Creates new ethereum wallet and returns address and public key
 * @param {String} privateKey (hex string)
 * @return {String} "<address>-<public key>"
 */
exports.createAddress = function(privateKey) {
    var key = ethUtil.addHexPrefix(privateKey);
    return ethUtil.bufferToHex(ethUtil.privateToAddress(key)) + '-' + ethUtil.bufferToHex(ethUtil.privateToPublic(key));
}

function guidToBuffer(guid) {
    var guidBuffer = uuid.parse(guid);
    var bn = new BN(guidBuffer, 'be');
    return bn.toArrayLike(Buffer, 'be', 32);
}