// Dependencies: 
//- Node 
//- NPM install web3
// My IP address 148.64.19.52
// URL from outside : HTTPS://148.64.19.52:7545

// to start node.js console in powerShell input : node // ctrl+C to stop process
// to start truffle console in powerShell input : truffle console // to exit truffle console input: .exit

// Connect web3 to the blockchain in node console
	var Web3 = require('web3') 
	var url = 'HTTP://127.0.0.1:7545' // (for local ganache network)
	var web3 = new Web3(url)

// Reading blockchain accounts/balance
	var chainAccounts = web3.eth.getAccounts((err, acc) => { chainAccounts = acc })
	var walletAddress = chainAccounts[0]
    var ethBalanceWallet = web3.eth.getBalance(walletAddress, (err, bal) => { ethBalanceWallet = bal} )
	web3.utils.fromWei(ethBalanceWallet, 'ether')

// Setup Ether amount
	var etherAmount = '1'
	var etherAmount = etherAmount.toString()
	var etherAmount = web3.utils.toWei(etherAmount, 'ether').toString() // '1000000000000000000'

// Load Contracts
	var NetId = web3.eth.net.getId((err, id) => { NetId = id })	

	var Token = require('./src/abis/Token.json')
	var TokenAbi = Token.abi
	var TokenNetId = Token.networks[NetId]
	var TokenAddress = TokenNetId.address
	var TokenContract = new web3.eth.Contract(TokenAbi, TokenAddress)

	var EthSwap = require('./src/abis/EthSwap.json')
	var EthSwapAbi = EthSwap.abi
	//var EthSwapNet = EthSwap.networks
	var EthSwapNetId = EthSwap.networks[NetId]
	var EthSwapAddress = EthSwapNetId.address
	var EthSwapContract = new web3.eth.Contract(EthSwapAbi, EthSwapAddress)
	
	var rate = '100'
	var compTokenAmount = new Function("etherAmount", "rate", "return etherAmount * rate");
	var tokenAmount = compTokenAmount(etherAmount, rate).toString();

// buy tokens using the callback
	EthSwapContract.methods.buyTokens().send({value: etherAmount, from: walletAddress}, function(error, transactionHash){ });
// buy tokens using the event emitter
	var Tx = ''
	var confNumber = ''
	var invoice = ''
	
	var execTokenPurchase = EthSwapContract.methods.buyTokens().send({value: etherAmount, from: walletAddress}).on('transactionHash', function(hash){ Tx = hash }).on('confirmation', function(confirmationNumber, receipt){ confNumber = confirmationNumber }).on('receipt', function(receipt){ invoice = receipt })
	buyTokens();

// sell tokens 
	var execTokenSell = TokenContract.methods.approve(EthSwapAddress, tokenAmount).send({ from: walletAddress }).on('transactionHash', (hash) => {
		  EthSwapContract.methods.sellTokens(tokenAmount).send({ from: walletAddress }).on('transactionHash', (hash) => { Tx = hash }).on('confirmation', function(confirmationNumber, receipt){ confNumber = confirmationNumber }).on('receipt', function(receipt){ invoice = receipt })
	})
	approve();
// Token balance
	var balanceToken = TokenContract.methods.balanceOf(walletAddress).call()
	var TokenContractBalance = TokenContract.methods.balanceOf(TokenAddress).call()
	var ethSwapTokenBalance = TokenContract.methods.balanceOf(EthSwapAddress).call()

	var balanceWallet = web3.eth.getBalance(walletAddress, (err, bal) => { balance = bal} )
	var balanceToken = web3.eth.getBalance(TokenAddress, (err, bal) => { balance = bal} )
	var balanceEthSwap = web3.eth.getBalance(EthSwapAddress, (err, bal) => { balance = bal} )  

	var totalSupply = TokenContract.methods.totalSupply().call()
	var decimals = TokenContract.methods.decimals().call() 
	var symbol = TokenContract.methods.symbol().call() 
	var name = TokenContract.methods.name().call()
	var allowance = TokenContract.methods.allowance().call()