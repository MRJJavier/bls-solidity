const BN256G2 = artifacts.require("BN256G2")
const BN256G2Helper = artifacts.require("BN256G2Helper")

contract("EcGasHelper - Gas consumption analysis", accounts => {
  // /////////////////////////////////////////// //
  // Check auxiliary operations for given curves //
  // /////////////////////////////////////////// //
  describe("BN256G2 operations", () => {
    const curveData = require("./bn256_g2.json")

    let library
    let helper
    before(async () => {
      library = await BN256G2.deployed()
      await BN256G2Helper.link(BN256G2, library.address)
      helper = await BN256G2Helper.new()
    })

    // toAffine
    for (const [index, test] of curveData.addition.valid.entries()) {
      it(`should add two points (${index + 1})`, async () => {
        await helper._bn128_g2_add([
          web3.utils.toBN(test.input.x1_re),
          web3.utils.toBN(test.input.x1_im),
          web3.utils.toBN(test.input.y1_re),
          web3.utils.toBN(test.input.y1_im),
          web3.utils.toBN(test.input.x2_re),
          web3.utils.toBN(test.input.x2_im),
          web3.utils.toBN(test.input.y2_re),
          web3.utils.toBN(test.input.y2_im)])
      })
    }

    for (const [index, test] of curveData.multiplication.valid.entries()) {
      it(`should mul a point with a scalar (${index + 1})`, async () => {
        await helper._bn128_g2_multiply([
          web3.utils.toBN(test.input.k),
          web3.utils.toBN(test.input.x_re),
          web3.utils.toBN(test.input.x_im),
          web3.utils.toBN(test.input.y_re),
          web3.utils.toBN(test.input.y_im)])
      })
    }
  })
})
