const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");
//const MilesAF = artifacts.require("MilesAF");
//const MilesSQ = artifacts.require("MilesSQ");


module.exports = async function(deployer) {
    // deploy Token.sol contract
    await deployer.deploy(Token);
    const token = await Token.deployed();

    // deploy MilesAF.sol contract 
    //await deployer.deploy(MilesAF);
    //const milesAF = await MilesAF.deployed();

    // deploy MilesSQ.sol contract 
    //await deployer.deploy(MilesSQ);
    //const milesSQ = await MilesSQ.deployed();

    // deploy EthSwap.sol contract
    await deployer.deploy(EthSwap, token.address);
    const ethSwap = await EthSwap.deployed();

    // transfer all tokens to ethSwap (1 million)
    await token.transfer(ethSwap.address, '1000000000000000000000000');
  };