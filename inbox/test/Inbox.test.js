
/* import ganache(testing framework), web3(collection of modules)
    ganache.provider  (communication layer between ganache and web3 instance)
*/
const assert = require('assert');
const ganache = require('ganache-cli');
const { Test } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


class Car{

    function1(){
        return "function 1 is successful";
    }

    function2(){
        return "function 2 is successful";
    }
}


describe('testcase 1', ()=>{

        it('test function 1', () =>{

                const test = new Car();
                assert.equal(test.function1(), 'function 1 is successful');
        });
});