
/* import ganache(testing framework), web3(collection of modules)
    ganache.provider  (communication layer between ganache and web3 instance)
*/
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());