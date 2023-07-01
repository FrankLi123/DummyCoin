
const {GENESIS_DATA }  = require('./config');
const cryptoHash = require('./crypto-hash');

class Block{


    // * dont care aobut order of parameters with {   } , pass argument into constructor needs { } and variableName: 
    constructor( {timestamp, lastHash, hash, data } ){

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // make the func be 'static'
    static genesis() {
        return new this(GENESIS_DATA);

    }


    static minedBlock({lastBlock, data}){

        const timestamp = Date.now();
        const lastHash = lastBlock.hash;

        return new Block( {
            timestamp: Date.now(),
            lastHash: lastBlock.hash,
            hash: cryptoHash(timestamp, lastHash, data)  ,
            data: data
        });

    }


}

// be about to share with otehr files
module.exports = Block;





