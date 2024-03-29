
const {GENESIS_DATA }  = require('../config');


const Block = require('./block');

const {cryptoHash} = require('../util');

class blockchain{

    constructor(){
        this.chain = [];
        this.chain = [Block.genesis()];
        this.len = 1;
    }

    addBlock( {data} ){
        const newBlock = Block.minedBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push( 
            newBlock
        );
    };


    /* Check whether the blockchain is valid.
    */
    static isValidChain( blockchain ){


        // check the data of the first block is correct
        if(  JSON.stringify(blockchain[0]) !== JSON.stringify(Block.genesis())  ){
            return false
        };


        //check if a lastHash reference of a block has been changed.

        let previousHash = blockchain[0].hash;

        for(let i = 1 ; i  < blockchain.length; i++){


            previousHash = blockchain[i-1].hash;
            const lastDifficulty = blockchain[i-1].difficulty;

            if(blockchain[i].lastHash != previousHash){
                return false;
            };

            const {timestamp, lastHash, hash, data, nounce, difficulty} = blockchain[i];


            let hashVal = cryptoHash(timestamp, lastHash, data, nounce, difficulty );

            if(hash != hashVal)    return false;
            
            if( Math.abs(lastDifficulty - difficulty) > 1 ){return false;}
        }
    


        return true;
    };



/* Function to check whether the current blockchain needs to be relaced by the input chain
*/
    replaceChain( chain, OnSuccess ){

        if(chain.length <= this.chain.length){

            console.error('the incoming chain must be longer');
            return;
        }


        if( blockchain.isValidChain(chain) == false ){
            console.error("the incoming chain must be valid");
            return;
        }

        if(OnSuccess){
            OnSuccess();
        }

        console.log("replace chain with" + chain);
        this.chain = chain;
    };


    
};


module.exports = blockchain;