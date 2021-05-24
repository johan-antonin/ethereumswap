pragma solidity ^0.5.0;

contract Rate {
    uint rate;
    address owner;
    
    constructor () public {
        rate = 100;
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
    
    function setRate(uint _rate) public onlyOwner {
        rate = _rate;
        //emit an event
        emit rateChange(msg.sender, rate);
    }
}