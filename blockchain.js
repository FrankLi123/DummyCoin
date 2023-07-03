
const {GENESIS_DATA }  = require('./config');


const Block = require('./block');



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
        if(blockchain[0] != Block.genesis()){
            return false;
        }


        //check if a lastHash reference of a block has been changed.

        let previousHash = blockchain[0].hash;

        for(let i = 1 ; i  < blockchain.length; i++){

                if(blockchain[i].lastHash != previousHash){

                    return false;
                }
                previousHash = blockchain[i].hash;
        }
    

        
        return true;
    };

};


module.exports = blockchain;