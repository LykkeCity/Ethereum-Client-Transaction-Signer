var assert = require('assert')
var lykkeEth = require('../index.js')
const BN = require('bn.js')
const SHA3 = require('keccakjs')

var account_a = "0x960336a077fB32d675405bd0A6cD0cb74aaa5062",
    account_b = "0xb295e245eD2fdf5776c3C8a49f0403BF0242262A",
    private_key_a = "4085dde01ea641a0f4fd6586ca11fc1f5df38e1bdcbef501da970cad9335b389",
    private_key_b = "74ed04f45c2a375a94189ef69661fa08235bb3b76be65934a0827262542e870c",
    amount_a = 10;

describe('check hash and sign', function () {
    it('guid check (positive number from guid)', function () {
        var resultHash = "0xede4ff3b1e534a2d0a1d1bbf531b91e80d9c6dca8cf0aa9b0ea9ffd39721f1af";
        var resultSign = "0x680d285c39732b12f5dadec46e98b9632164e7300e7b5f103a78e70894cb0be555d103e1cc58c62a127008fd2e3b83a2bddb08de7a9cc85c16c13e61ed9af37b1b";
        var guid = "176a82d8-3154-4c76-bab8-441ad43d0de6";

        var hash = lykkeEth.getHash(guid);
        assert.equal(resultHash, hash);
        assert.equal(resultSign, lykkeEth.signHash(hash, private_key_a));
    })

    it('guid check (negative number from guid)', function () {
        var resultHash = "0x67e547e0e11e33396f53ce559f089124cc12e54f936a166dd14798bf1677b5e8";
        var resultSign = "0x7a1db528d034aa63362682a91164599fa180cd08fb62c6d3f6f2867d7e2455e61ba0050b2c31e21074a3fdaef9379c36fc809fec467c03b7015c21c23ade35131c";
        var guid = "876a82d8-3154-4c76-bab8-441ad43d0de6";

        var hash = lykkeEth.getHash(guid);
        assert.equal(resultHash, hash);
        assert.equal(resultSign, lykkeEth.signHash(hash, private_key_a));
    })

    it('check signature', function () {
        var result = "0x4aae2cfe98d7c1b2386b6198c212585b6e414592aaca031e0850f6ec107bdc3a0fa5d896d1050af500932f5d449a7f1e4e392b5b48e6db627773aac9fd468d121c";
        var sig = lykkeEth.signHash(lykkeEth.getHash(account_a, account_b, amount_a), private_key_a);
        assert.equal(result, sig);
    })
})
