import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import Dashboard from './Dashboard'
import Transcation from './Transaction'

class Main extends Component {
    constructor(props) {
     super(props)
     this.state = { 
        currentForm: 'buy'
    }
}

  render() {
    //console.log(" api url", this.state.apiUrl)
    let transaction
    if(this.props.Tx) {
        transaction = <Transcation 
            Tx={this.props.Tx}
            txUrl={this.props.txUrl}
        />
    }

    let content
    if(this.state.currentForm === 'buy') {
        content = <BuyForm
            ethBalance={this.props.ethBalance} 
            tokenBalance={this.props.tokenBalance}
            buyTokens={this.props.buyTokens}
            tokenSymbol={this.props.tokenSymbol}
            rate={this.props.rate}
        />
    } else {
        content = <SellForm 
            ethBalance={this.props.ethBalance} 
            tokenBalance={this.props.tokenBalance}
            sellTokens={this.props.sellTokens}
            tokenSymbol={this.props.tokenSymbol}
            rate={this.props.rate}
        />
    }

    let dashboard
        dashboard = <Dashboard 
            ethBalance={this.props.ethBalance} 
            tokenBalance={this.props.tokenBalance}
            ethSwapBalance={this.props.ethSwapBalance}
            ethSwapAddress={this.props.ethSwapAddress}
            ethSwapContractUrl={this.props.ethSwapContractUrl}
            circulatingToken={this.props.circulatingToken}
            totalSupply={this.props.totalSupply}
            tokenAddress={this.props.tokenAddress}
            tokenContractUrl={this.props.tokenContractUrl}
            tokenName={this.props.tokenName}
            tokenSymbol={this.props.tokenSymbol}
            account={this.props.account}
            tierLevel={this.props.tierLevel}
            setRate={this.props.setRate}
            rate={this.props.rate}
        />

    return (
        <div id="content" className="mt-3">
            
            {transaction}
            
            <div className="d-flex justify-content-between mb-3">
                <button 
                    className="btn btn-light" 
                    onClick={(Event) => {
                        //this.props.fetchRate(this.state.apiUrl)
                        this.setState({ currentForm: 'buy' })
                    }}
                >
                    Buy
                </button>
                <span className="text-muted">&lt; &nbsp; &gt;</span>
                <button 
                    className="btn btn-light" 
                    onClick={(Event) => {
                        //this.props.fetchRate(this.state.apiUrl)
                        this.setState({ currentForm: 'sell' })
                    }}
                >
                    Sell
                </button>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    {content}
                </div>    
            </div>        

            {dashboard}

        </div>
    );
  }
}

export default Main;
