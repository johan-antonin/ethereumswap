pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
   string public name = "Amadeus NDCx swap contract";    
   Token public token;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

   constructor(Token _token) public {
    token = _token;
   }

   function buyTokens(uint _rate) public payable {
       //Calculate number of tokens to buy 
       uint tokenAmount = (msg.value * _rate)/1e8;

        //require ethSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

       token.transfer(msg.sender, tokenAmount);

       // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, _rate);
   }

    function sellTokens(uint _amount, uint _rate) public {
        //Use cant sell moe token he has
        require(token.balanceOf(msg.sender) >= _amount);

        
        // calcule amount of ether to redeem
        uint etherAmount = (_amount / _rate)*1e8;

        // Require that EthSwap has enough ether
        require(address(this).balance >= etherAmount);

        // perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        //Emit an event
        emit TokensSold(msg.sender, address(token), _amount, _rate);
    }



}