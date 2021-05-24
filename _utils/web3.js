// PowerShell C:\Users\jantonin> cd ./eth_swap
// PowerShell C:\Users\jantonin\eth_swap> node _utils/web3.test.js

// Connect web3 to the blockchain in node console
    const web3Lib = require('web3')
    const url = 'HTTP://127.0.0.1:7545' // (for local ganache network)
    //const url = 'HTTP://127.0.0.1:8545' // (for local geth network + rinkeby)
    const web3 = new web3Lib(url)
    console.log("-->>URL=", url)
 
// Setup Ether amount for purchase
    var etherAmountSpend = '1'
    var etherAmountSpend = etherAmountSpend.toString()
    var etherAmountSpend = web3.utils.toWei(etherAmountSpend, 'ether') // '1000000000000000000'
    console.log("-->>etherAmountSpend=", web3.utils.fromWei(etherAmountSpend, 'ether'))

async function loadBlockchainData() { 
// Reading blockchain accounts/balance
    const chainAccounts = await web3.eth.getAccounts()
    //or using call back function : var chainAccounts = await web3.eth.getAccounts((err, acc) => { chainAccounts <= acc })
    const walletAddress = chainAccounts[0]    
    const ethBalanceWallet = await web3.eth.getBalance(walletAddress)
    // or using call back function : var ethBalanceWallet = web3.eth.getBalance(walletAddress, (err, bal) => { ethBalanceWallet = bal} )
    console.log("-->> walletAddress=", walletAddress, web3.utils.fromWei(ethBalanceWallet, 'ether'))
    
    //Reading blockchain network
    const networkId = await web3.eth.net.getId()
    console.log("-->> networkId=", networkId)

    // load Token contract
    const Token = require('../src/abis/Token.json')
	const TokenAbi = Token.abi
	const TokenNetId = Token.networks[networkId]
	const TokenAddress = TokenNetId.address
	const TokenContract = new web3.eth.Contract(TokenAbi, TokenAddress)
    const TokenBalance = await web3.eth.getBalance(TokenAddress)
    console.log("-->> TokenContract=", TokenAddress, TokenBalance)

    // load ethSwap contract
    const EthSwap = require('../src/abis/EthSwap.json')
    const EthSwapAbi = EthSwap.abi
    const EthSwapNetId = EthSwap.networks[networkId]
    const EthSwapAddress = EthSwapNetId.address
    const EthSwapContract = new web3.eth.Contract(EthSwapAbi, EthSwapAddress)
    const EthSwapBalance = await web3.eth.getBalance(EthSwapAddress)
    console.log("-->> EthSwapContract=", EthSwapAddress, EthSwapBalance)
}
loadBlockchainData()