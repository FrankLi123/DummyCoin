
class Block{


    // * dont care aobut order of parameters with {   } , pass argument into constructor needs { } and variableName: 

    constructor( {timestamp, lastHash, hash, data } ){

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
}

// be about to share with otehr files
module.exports = Block;



const dummy = new Block ({timestamp: "01/01/2021", lastHash: "foo-lastHash",  hash: "foo-hash", data: 'food-data' } )

 console.log('block1', dummy )


 const Block = require('./block');

describe('Block', () => {


    const timestamp = 'foo-date';
    const lastHash = 'foo-hash';

    const hash = 'bar-hash';

    const data = ['blockchain', 'data'];

    const block = new Block({ timestamp, lastHash,hash, data });

    it('has a timestamp, lastHash, hash, and data property' , ()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);       
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });
});


