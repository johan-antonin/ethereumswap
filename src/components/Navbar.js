import React, { Component } from 'react'
import Identicon from 'identicon.js';

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
            <span className="navbar-brand col-sm-3 col-md-2 mr-0">
            Amadeus Assets Network &nbsp;
              <small>'ʘ‿ʘ' &nbsp; Swap contract</small>
            </span>
            <ul className="navbar-nav px-3 text-white">
              <li className="nav-item text-nowrap d-none d-sm-none d-md-block">
                <small id="account" className="">
                       
                        Tier level : { this.props.tierLevel } /&nbsp;
                        {this.props.account}
                        {this.props.account
                        ?<img
                        className="ml-2"
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        alt=""
                        />
                        : <span></span> 
                        } 
                                     
                </small>
              </li>
            </ul>
        </nav>
    );
  }
}

export default Navbar;
