var assert = require('assert')
var lykkeEth = require('../index.js')
const BN = require('bn.js')
const SHA3 = require('keccakjs')

var account_a = "0x960336a077fB32d675405bd0A6cD0cb74aaa5062",
  account_b = "0xb295e245eD2fdf5776c3C8a49f0403BF0242262A",
  private_key_a = "4085dde01ea641a0f4fd6586ca11fc1f5df38e1bdcbef501da970cad9335b389",
  private_key_b = "74ed04f45c2a375a94189ef69661fa08235bb3b76be65934a0827262542e870c",
  amount_a = 10;

describe('check hash', function () {
  it('hash from adress', function () {
    var result = "0xc432894b6d988881dcc107a658b0b7f7334e5410bc422ef4654fd382070b9c5a";
    assert.equal(result, lykkeEth.getHash(account_a));
  })

  it('hash from adress + addre ss', function () {
    var result = "0x0706790bb1d27247d755f75904f842a50142d5fd0318052fdf51dc1885e46f97";
    assert.equal(result, lykkeEth.getHash(account_a, account_b));
  })

  it('hash from number', function () {
    var result = "0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8";
    assert.equal(result, lykkeEth.getHash(amount_a));
  })

  it('hash from address + address + number', function () {
    var result = "0x0d95bd996b826a43630082d99723ae1fb5d24c9077551a36e3c07ddc8e1b8701";
    assert.equal(result, lykkeEth.getHash(account_a, account_b, amount_a));
  })
})

