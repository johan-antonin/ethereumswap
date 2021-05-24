import React, { Component } from 'react'

class Dashboard extends Component {
     render() {
        return (  
        <div className="card mb-4">
            <h5 className="card-header">Dashboard</h5>
        
            <form className="mb-3" onSubmit={(Event) => {
                                                        Event.preventDefault()
                                                        this.props.setRate()
                                                        }
                                            }
            >
                <div className="card-body">
                    <button type="submit" className="btn btn-light btn-block btn-block btn-lg">Update exchange rate</button>
                    <div className="mb-0">
                        <span className="float-right text-muted">1 AAN = {this.props.rate} {this.props.tokenSymbol}</span>
                    </div>
                </div>
            </form>

            <div className="card-body">
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">My AAN balance is <b> {this.props.ethBalance} AAN</b> </li>
                        <li className="list-group-item">My {this.props.tokenSymbol} balance is <b>{this.props.tokenBalance} {this.props.tokenSymbol}</b></li>
                        <li className="list-group-item">My tier level is <b>{this.props.tierLevel}</b></li>
                        <li className="list-group-item">My wallet address is {this.props.account}</li>
                    </ul>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> </li>
                    </ul>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Token name is <b>{this.props.tokenName} ({this.props.tokenSymbol})</b>
                            <div>Token address is&nbsp; 
                                <a 
                                    href= {this.props.tokenContractUrl} >
                                    {this.props.tokenAddress}
                                </a>
                            </div>
                            Total {this.props.tokenSymbol} token supply is <b>{window.web3.utils.fromWei(this.props.totalSupply, 'Ether')} {this.props.tokenSymbol}</b> 
                            <div>
                            Circulating supply is <b>{this.props.circulatingToken} {this.props.tokenSymbol}</b>
                            </div> 
                        </li>      
                    </ul>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> </li>
                    </ul>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Swap contract balance is <b>{this.props.ethSwapBalance} AAN</b>
                            <div>Swap contract address is&nbsp; 
                                <a 
                                    href= {this.props.ethSwapContractUrl} >
                                    {this.props.ethSwapAddress}
                                </a>
                            </div>                        
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        );
      }
    }
    
    export default Dashboard;
    