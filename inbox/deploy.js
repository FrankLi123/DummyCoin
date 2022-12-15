const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');


// set the provider(Truffle/) to use testing in Goerli Ether- network
const provider = new HDWalletProvider(
'jungle detail produce slice group reflect loyal gather photo unlock have snap', 
'https://goerli.infura.io/v3/0bc26115df1c4fb98cd9aa4081885505'
);

//make new Web3 instance - use methods of smart contract for testing
const web3 = new Web3(provider);

const deploy = async()=>{

    const accounts = await web3.eth.getAccounts();

    console.log('to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments:['Hello !']})
    .send({gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();



