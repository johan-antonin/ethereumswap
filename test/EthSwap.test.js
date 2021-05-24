const { assert } = require('chai')

const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

require('Chai')
  .use(require('chai-as-promised'))
  .should()

contract ('EthSwap', ([deployer, investor]) => {

    let token , ethSwap

    function tokens(n) {
        return web3.utils.toWei(n, 'ether');
    }

    before(async() => {
        // runs once before the first test in this block
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address) 
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    describe('Token deloyment', async () => {
        it('contract has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'Amadeus NDCx Token')
        })
    })

    describe('EthSwap deployment', async () => {
        it('contract has a name', async () => {   
            const name = await ethSwap.name()
            assert.equal(name, 'Amadeus NDCx swap contract')
        })

        it('contract has a all tokens !', async () => {
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })
    describe('buyTokens()', async () => {
        let result

        before(async() => {
            result = await ethSwap.buyTokens({ from : investor, value: web3.utils.toWei('1', 'ether') })
        })

        it('Allow user purchase token at fixed price', async () => {
            // check investor balance
            let inverstorBalance = await token.balanceOf(investor)
            assert.equal(inverstorBalance.toString(), tokens('100'))
            
            // check ethSwap balance after purchase
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
        })
    })

    describe('sellTokens()', async () => {
        let result

        before(async() => {
            // Investor must approve tokens before the purchase 
            await token.approve(ethSwap.address, tokens('100'), { from: investor })
            // Investor sells tokens
            result = await ethSwap.sellTokens(tokens('100'), { from: investor })
        })

        it('Allow user to sell token to ethSwap at fixed price', async () => {
            // check investor balance
            let inverstorBalance = await token.balanceOf(investor)
            assert.equal(inverstorBalance.toString(), tokens('0'))

            // check ethSwap balance after purchase
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('1000000'))
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

            // Check Logs to ensure event was emitted with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')

            // Failure: investor cant sell more token than they have
            await ethSwap.sellTokens(tokens('500'), { from: investor }).should.be.rejected; 
        })
    })

})