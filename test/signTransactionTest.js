var assert = require('assert')
var lykkeEth = require('../index.js')
const BN = require('bn.js')
const SHA3 = require('keccakjs')

var account_a = "0x960336a077fB32d675405bd0A6cD0cb74aaa5062",
    private_key_a = "0x1149984b590c0bcd88ca4e7ef80d2f4aa7b0bc0f52ac7895068e89262c8733c6",
    transaction_from_a_unsigned = "f86a81cb8506fc23ac0082ea6094ce2ef46ecc168226f33b6f6b8a56e90450d0d2c080b844a9059cbb000000000000000000000000f87bbc410e051f32de3fcb0791a5e22c59eaf4d100000000000000000000000000000000000000000000000000000000000000c8808080";
    transaction_from_a_signed =   "f8aa81cb8506fc23ac0082ea6094ce2ef46ecc168226f33b6f6b8a56e90450d0d2c080b844a9059cbb000000000000000000000000f87bbc410e051f32de3fcb0791a5e22c59eaf4d100000000000000000000000000000000000000000000000000000000000000c81ba085ee100426d89c54af7067889d066e31c0f126b315e7b8a98b32ea8df166e99da03a5a65b4bb34f36072a7f10e757b55902d3ba08eb19b8d35a9e1a669e518f87b";

describe('check transaction sign', function() {
    it('sign transaction', function() {

        var signedTransaction = lykkeEth.signTransaction(transaction_from_a_unsigned, private_key_a);
        assert.equal(signedTransaction, transaction_from_a_signed);
        assert.equal(signedTransaction.length, transaction_from_a_signed.length);
    })
})