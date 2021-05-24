pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "Amadeus NDCx swap contract";    
    Token public token;
    uint rate;
    address owner;

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
        rate = 0;
        owner = msg.sender;
    }
    
    event rateChange(
        address account,
        uint rate
    );
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function getRate() public view returns (uint) {
        return rate;
    }
    
    function setRate(uint _rate) public payable onlyOwner {
        rate = _rate;
        
        //emit an event
        emit rateChange(msg.sender, rate);
    }

    function buyTokens() public payable {
       //Calculate number of tokens to buy
       uint tokenAmount = msg.value * rate; 
    
        //require ethSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);
    
       token.transfer(msg.sender, tokenAmount);
    
       // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        //Use cant sell more token he has
        require(token.balanceOf(msg.sender) >= _amount);
        
        // calcule amount of ether to redeem
        uint etherAmount = _amount / rate;

        // Require that EthSwap has enough ether
        require(address(this).balance >= etherAmount);

        // perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        //Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }

}