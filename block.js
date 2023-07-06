
const {GENESIS_DATA, MINE_RATE }  = require('./config');
const cryptoHash = require('./crypto-hash');

class Block{


    // * dont care aobut order of parameters with {   } , pass argument into constructor needs { } and variableName: 
    constructor( {timestamp, lastHash, hash, data, nounce, difficulty } ){

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nounce = nounce;
        this.difficulty = difficulty;
    }

    // make the func be 'static'
    static genesis() {
        return new this(GENESIS_DATA);

    }


    static minedBlock({lastBlock, data}){

        let hash, timestamp;
        // const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nounce = 0;


        do {

            nounce++;
            timestamp = Date.now();

            // Adjust the difficulty current mining process
            difficulty = Block.adjustDifficulty( { originalBlock: lastBlock, timestamp : timestamp } );


            hash = cryptoHash(timestamp, lastHash, data, nounce, difficulty);

        }while( hash.substring(0, difficulty) !== '0'.repeat(difficulty));



        return new Block( {
            timestamp,
            lastHash: lastBlock.hash,
            hash: hash,
            data: data,
            nounce,
            difficulty,
        });

    }


   /*
    * originalBlock: the last block
    * timetamp: the time of the current mined block
    */
    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock;

        if(difficulty < 1){
            return 1;
        }
        const difference  = timestamp - originalBlock.timestamp;
        if(difference < MINE_RATE ){
            return difficulty + 1;
        }else{
            return difficulty - 1;           
        }
    }
}

// be about to share with otehr files
module.exports = Block;





