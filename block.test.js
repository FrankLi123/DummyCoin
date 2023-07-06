const Block = require('./block');
const {GENESIS_DATA, MINE_RATE } = require('./config');
const hexToBinary = require('hex-to-binary');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {

    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    
    // add nounce and difficulty
    const nounce = 1;
    const difficulty = 1;

    const block = new Block({ timestamp, lastHash,hash, data, nounce, difficulty});

    it('has a timestamp, lastHash, hash, and data property' , ()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);       
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);

        expect(block.nounce).toEqual(nounce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('return a Block isntance', ()=>{
            expect(genesisBlock instanceof Block).toEqual(true);
        });

        it('returns the genesis data', ()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });

    });

    // for creating mined block
    describe('minedBlock()', () => {

        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.minedBlock({
            lastBlock, data
        });

        it('return a Block isntance', ()=>{
            expect(minedBlock instanceof Block).toEqual(true);
        });

        it('set the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('set the `data` ', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('set a `timestamp`', ()=> {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the proper inputs', () => {
            expect(minedBlock.hash).toEqual(cryptoHash( 
                minedBlock.timestamp,
                minedBlock.nounce,
                minedBlock.difficulty,
                lastBlock.hash,
                data
                ) );
        });

        it('sets a `hash` that matches the difficulty criteria', () =>{
            expect( hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty) );
        });

        

    });


    describe('adjustDifficulty()', () =>{

        it('it raises the difficulty for a quickly mined block', ()=>{    
            expect(Block.adjustDifficulty({
                originalBlock: block, timestamp: block.timestamp + MINE_RATE - 100   // difficulty rate based on block and timestamp
            })).toEqual(block.difficulty + 1);
        });

        it('lowers the difficulty for a slowly mined block', () =>{
            expect(Block.adjustDifficulty({
                originalBlock: block, timestamp: block.timestamp + MINE_RATE + 100   // difficulty rate based on block and timestamp
            })).toEqual(block.difficulty - 1);
        });

        it('has a lower limit of 1' ,() =>{

            block.difficulty = -1;

            expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);

        });
    });
}); 


