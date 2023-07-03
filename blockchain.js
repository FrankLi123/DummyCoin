
const {GENESIS_DATA }  = require('./config');


const Block = require('./block');



class blockchain{

    constructor(){
        this.chain = [];
        this.chain = [Block.genesis()];
    
        this.len = 1;
    }

    addBlock( {data} ){

        const newBlock =             Block.minedBlock({

            lastBlock: this.chain[this.chain.length - 1],
            data

        });

        this.chain.push( 

            newBlock
        );

    }

}


module.exports = blockchain;