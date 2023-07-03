
const {GENESIS_DATA }  = require('./config');


const Block = require('./block');

const cryptoHash = require('./crypto-hash');

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


        // console.log( 1 + " " + JSON.stringify(blockchain[0]));
        // console.log(2 + " "+  JSON.stringify(Block.genesis()));
        // check the data of the first block is correct
        if(  JSON.stringify(blockchain[0]) !== JSON.stringify(Block.genesis())  ){
            return false
        };


        //check if a lastHash reference of a block has been changed.

        let previousHash = blockchain[0].hash;

        for(let i = 1 ; i  < blockchain.length; i++){


            previousHash = blockchain[i-1].hash;

            if(blockchain[i].lastHash != previousHash){
                return false;
            };

            const {timestamp, lastHash, hash, data} = blockchain[i];


            let hashVal = cryptoHash(timestamp, lastHash, data);

            if(hash != hashVal)    return false;
            
            
        }
    


        return true;
    };

};


module.exports = blockchain;