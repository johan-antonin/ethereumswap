import React, { Component } from 'react'

class Transaction extends Component {

     render() {      
        return (
            <div className="alert alert-success" role="alert">
            Transaction hash: <span className="text-wrap text-break">{this.props.Tx}</span>
            <div>
                <small>
                    <a 
                    href={this.props.txUrl}>
                    View my transaction on Etherscan.io
                    </a>
                </small>
            </div>
            </div>
        );
      }
    }
    
    export default Transaction;
    