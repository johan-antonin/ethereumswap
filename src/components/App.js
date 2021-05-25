import React, { Component } from 'react'
import web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from "./Navbar"
import Main from "./Main"
import './App.css'

class App extends Component {

// Block to load Web3 and blockchain data
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.fetchRate()
  }

// Block to load the Binance api
  async fetchRate() {
      //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // disable HTTPS the certificate
      //const fetch = require("node-fetch"); // needed for node.js console only   
      const apiUrl = "https://api.binance.com/api/v3/avgPrice?symbol=ETCUSDT"
      const response = await fetch(apiUrl)
      const api = await response.json()
      const rate = Number(api.price).toFixed(3)
      const setRate = parseInt(Number(api.price).toFixed(8)*1e8)
        this.setState({ rate, setRate })
          console.log(api.price, this.state.rate, this.state.setRate)
  }
  // Block to update rate in Smart contract
  setRate = async () => {
    await this.fetchRate()  
    let rate = parseInt(this.state.setRate)
    this.state.ethSwap.methods.setRate(rate).send({from: this.state.account}, function(error, result){  })
    await this.loadBlockchainData()
  } 

// Block to load the blockchain data
  async loadBlockchainData() { 
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
    const ethBalance = Number(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'Ether')).toFixed(3)
      this.setState({ ethBalance }) 

    // get networkId
    const networkId = await web3.eth.net.getId()
      this.setState({ networkId }) 

    // Block to load token (Token.sol)      
    const tokenData = Token.networks[networkId]

    if(tokenData) {
      var token = new web3.eth.Contract(Token.abi, tokenData.address)
        this.setState({ token })
      const tokenAddress = tokenData.address
        this.setState({ tokenAddress })
      const totalSupply = await token.methods.totalSupply().call()
        this.setState({ totalSupply })
      const tokenSymbol = await token.methods.symbol().call()
        this.setState({ tokenSymbol })             
      const tokenName = await token.methods.name().call()
        this.setState({ tokenName })  
      // Block to calculate token balanceOf
      const tokenBalance = await token.methods.balanceOf(this.state.account).call()
       console.log(tokenBalance)
        this.setState({ tokenBalance: Number(web3.utils.fromWei(tokenBalance, 'ether')).toFixed(3) })
      // block to calculate tierLevel
      if(tokenBalance) {
        if(web3.utils.fromWei(tokenBalance, 'ether') >= 1000) { 
          var tierLevel ='Gorvernor' 
        } 
        else { 
          tierLevel = 'Frequent flyer' 
        }
        this.setState({ tierLevel: tierLevel })
    }
    } else {
      window.alert('Token Contract not deployed to the detected network')
    }

    // block to load EthSwap (EthSwap.sol)
    const ethSwapData = EthSwap.networks[networkId]

    if(ethSwapData) {
      var ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
        this.setState({ ethSwap })
      const ethSwapAddress = ethSwapData.address
        this.setState({ ethSwapAddress })
      const ethSwapBalance = Number(web3.utils.fromWei(await web3.eth.getBalance(ethSwapAddress), 'Ether')).toFixed(3)
        this.setState({ ethSwapBalance })
      const ethSwapTokenBalance = await token.methods.balanceOf(this.state.ethSwapAddress).call()
        this.setState({ ethSwapTokenBalance}) 
          //console.log("ethSwapTokenBalance=", this.state.ethSwapTokenBalance) 
     // const contractRate = await ethSwap.methods.getRate().call()
     //   this.setState({ contractRate})
     //     console.log("contractRate=", this.state.contractRate)         
    } else {
      window.alert('EthSwap Contract not deployed to the detected network')
    }

    // block to compute the circulating tokens
    if(ethSwapData && tokenData) { 
      const circulatingToken = Number(web3.utils.fromWei(this.state.totalSupply, "ether") - web3.utils.fromWei(this.state.ethSwapTokenBalance, "ether")).toFixed(3)
        this.setState({ circulatingToken: circulatingToken })
    }

    // block to compute etherscan Tx url
    if(this.state.Tx) {
      const etherscan = "https://rinkeby.etherscan.io/tx/"
      const txUrl = etherscan+this.state.Tx
      this.setState({ txUrl })
    }

    // block to compute etherscan contract url for ethswap
    if(this.state.ethSwapAddress) {
      const etherscan = "https://rinkeby.etherscan.io/address/"
      const ethSwapContractUrl = etherscan+this.state.ethSwapAddress
      this.setState({ ethSwapContractUrl })
    }

    // block to compute etherscan contract url for token
    if(this.state.tokenAddress) {
      const etherscan = "https://rinkeby.etherscan.io/token/"
      const tokenContractUrl = etherscan+this.state.tokenAddress
      this.setState({ tokenContractUrl })
    }

    this.setState({ loading: false })
  }

// Block to load Web into browser
  async loadWeb3(){
    if (window.ethereum) {     // Modern dapp browsers...
      window.web3 = new web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3) {    // Legacy dapp browsers...
      window.web3 = new web3(window.web3.currentProvider)
    }
    else {    // If no injected web3 instance is detected, fall back to Ganache
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
 
// Block to execute BuyToken function
  buyTokens = (etherAmount) => { 

    this.setState({ loading: true })
    this.state.ethSwap.methods.buyTokens(this.state.setRate)
                                .send({ value: etherAmount, from: this.state.account })
                                .on('transactionHash', (hash) => {
                                const Tx = hash 
                                this.setState({Tx : Tx })
    this.loadBlockchainData()                        
    this.setState({ loading: false })
      })
  }

// Block to execute sellToken function
  sellTokens = (tokenAmount) => {
    //this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwapAddress, tokenAmount)
                            .send({ from: this.state.account })
                            .on('transactionHash', (hash) => {
      this.state.ethSwap.methods.sellTokens(tokenAmount, this.state.setRate)
                                .send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                const Tx = hash 
                                this.setState({Tx : Tx })
        this.loadBlockchainData()
        //this.setState({ loading: false })
      })
    })
  }

// Block to construct the properties of the App
  constructor(props) {
    super(props)
    this.state = { 
      tierLevel: '',
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      ethSwapBalance: '0',
      ethSwapAddress: '',
      ethSwapContractUrl: '',
      tokenAddress: '',
      tokenContractUrl: '',
      totalSupply: '0',
      circulatingToken: '0',
      tokenSymbol: '',
      tokenName: '',
      Tx: '',
      txUrl: '',
      post: {},
      rate: 0,
      exRate: 0,
      loading: true
     }
  }

// BLock to render the App content
  render() {
    let content
    if(this.state.loading){
      content = <p id="loader" className="text-center" > loading ...</p>
    } else {
      content = <Main 
        // User data
        rate={this.state.rate}
        account={this.state.account}
        tierLevel={this.state.tierLevel}
        ethBalance={this.state.ethBalance} 
        tokenBalance={this.state.tokenBalance} 
        // ethSwap data
        ethSwapBalance={this.state.ethSwapBalance}
        ethSwapAddress={this.state.ethSwapAddress}
        ethSwapContractUrl={this.state.ethSwapContractUrl}
        // Token data
        tokenName={this.state.tokenName}
        tokenSymbol={this.state.tokenSymbol}
        tokenAddress={this.state.tokenAddress}
        tokenContractUrl={this.state.tokenContractUrl}
        totalSupply={this.state.totalSupply}
        circulatingToken={this.state.circulatingToken}
        // Token functions
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
        setRate={this.setRate}
        // Transaction data
        Tx={this.state.Tx}
        txUrl={this.state.txUrl}
        />
    }

    return (
      <div>
        <Navbar 
          tokenSymbol={this.state.tokenSymbol}
          account={this.state.account} 
          tierLevel={this.state.tierLevel}
        />       
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">

               {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
