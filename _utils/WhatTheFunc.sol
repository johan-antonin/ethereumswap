pragma solidity ^0.4.0;

contract WhatTheFunc {
    string word = "bird";
    uint number = 42;
    address owner;
    
    constructor () public {
        word = "bird";
        number = 42;
        owner = msg.sender;
    }
    
    event Changed(address a);
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function getWord() public constant returns (string) {
        return word;
    }
    
    function setWord(string _word) public onlyOwner {
        word = _word;
        emit Changed(msg.sender);
    }

    function getNumber() public constant returns (uint) {
        return number;
    }
    
    function setNumber(uint256 _number) public onlyOwner {
        number = _number;
        emit Changed(msg.sender);
    }
}