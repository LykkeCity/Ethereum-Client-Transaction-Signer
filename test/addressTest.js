var assert = require('assert')
var lykkeEth = require('../index.js')
const ethUtil = require('ethereumjs-util');

var account_a = "0x960336a077fB32d675405bd0A6cD0cb74aaa5062",
    account_b = "0xb295e245eD2fdf5776c3C8a49f0403BF0242262A",
    private_key_a = "4085dde01ea641a0f4fd6586ca11fc1f5df38e1bdcbef501da970cad9335b389",
    private_key_b = "74ed04f45c2a375a94189ef69661fa08235bb3b76be65934a0827262542e870c",
    amount_a = 10;

describe('wallet test', function () {
    it('get new wallet', function () {
        var wallet = lykkeEth.createAddress();
        var addressFromPublic = ethUtil.bufferToHex(ethUtil.pubToAddress(wallet.publicKey))

        assert.equal(addressFromPublic, wallet.address);
    })

})
