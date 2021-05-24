import React, { Component } from 'react'
import tokenLogo from '../logoiata.png'
import ethLogo from '../logoaan.png'

class SellForm extends Component {

constructor(props) {
    super(props)
    this.state = { 
        output: '0'
    }
}
  render() {
    return (
        <form className="mb-3" onSubmit={(Event) => {
            Event.preventDefault()
            let tokenAmount
            tokenAmount = this.input.value.toString()
            tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
            this.props.sellTokens(tokenAmount)
        }}>
            <div>
                <label className="float-left"><b>Input</b></label>
                <span className="float-right text-muted">
                    User balance: {this.props.tokenBalance } 
                </span>
            </div>
            <div className="input-group mb-4">
                <input
                    type="text"
                    onChange={(Event) => { 
                        const tokenAmount = this.input.value.toString()
                        const output =  (tokenAmount / this.props.rate).toFixed(2)
                        this.setState({ output: output }) 
                    }}
                    ref={(input) => { this.input = input }} 
                    className="form-control form-control-lg"
                    placeholder="0"
                    required 
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                        <img src={tokenLogo} height='34' width='34' alt=""/> 
                        &nbsp; {this.props.tokenSymbol}
                    </div>
                </div>
            </div>
            <div>
                <label className="float-left"><b>Output</b></label>
                <span className="float-right text-muted">
                    User balance: {this.props.ethBalance}  
                </span>
            </div>
            <div className="input-group mb-2">
                <input
                    type="test"
                    className="form-control form-control-lg"
                    placeholder="0"
                    value={this.state.output}
                    disabled
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                        <img src={ethLogo} height='30' width='30' alt=""/>
                        &nbsp;&nbsp;&nbsp; AAN
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <span className="float-left text-muted">Exchange rate</span>
                <span className="float-right text-muted">{this.props.rate} {this.props.tokenSymbol} = 1 AAN</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-block btn-lg">SWAP</button>
        </form>
    );
  }
}

export default SellForm;
