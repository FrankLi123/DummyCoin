
/* import ganache(testing framework), web3(collection of modules)
    ganache.provider  (communication layer between ganache and web3 instance)
*/
const assert = require('assert');
const ganache = require('ganache-cli');
const { Test } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


const {interface, bytecode} = require('../compile');





let accounts;
let inbox;

// deploy the smart contract through web3.eth module
beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hello!'] })
    .send({ from: accounts[0], gas: '1000000'})
});

describe('Inbox', ()=>{
    it('deploy contract', ()=>{
        console.log(inbox);
    })
})

// class Car{

//     function1(){
//         return "function 1 is successful";
//     }

//     function2(){
//         return "function 2 is successful";
//     }
// }



// describe('testcase 1', ()=>{

//         it('test function 1', () =>{

//                 const test = new Car();
//                 assert.equal(test.function1(), 'function 1 is successful');
//         });
// });