const Blockchain = require('./blockchain');

const Block = require('./block');

describe('Blockchain', () => {


        // make it a dynamic variable that could be changed later 
        let blockchain;


        // reset blockchain obj to a new instance
        beforeEach(() =>{
            blockchain = new Blockchain();
        })


        it('contains a `chain` Array instance', ()=>{

            expect(blockchain.chain instanceof Array).toBe(true);
        });

        it('starts with the genesis block', ()=>{
            expect(blockchain.chain[0]).toEqual(Block.genesis());
        })

        it('adds a new block to the chain', ()=>{

            const newData = 'foo bar';

            blockchain.addBlock({data: newData});

            expect( blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);

        });

    
        


        describe("isValidChain()", () => {
            beforeEach(() =>{
                blockchain.addBlock({data: 'Bears'});
            blockchain.addBlock({data: 'Beets'});
            blockchain.addBlock({data: 'Basketball'});
                
            });

            describe('when the chain does not start with the genesis block', () => {

                it('return false', () => {

                    blockchain[0] = {data: 'fake-genesis'};

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });


            describe(' when the chain starts with the genesis block and has multiple blocks', () =>{

                beforeEach(() =>{
                    blockchain.addBlock({data: 'Bears'});
                    blockchain.addBlock({data: 'Beets'});
                    blockchain.addBlock({data: 'Basketball'});    
                });

                
                describe(' and a lastHash reference has changed', () => {

                    it('returns false', () => {

                        blockchain.chain[2].lastHsh = 'broken-lastHash';

                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                    });
                });

            describe('and the chain contains a block with an invalid field', () =>{
                it('returns true', ()=>{
                    blockchain.chain[2].data = "set-bad-data";
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });


            // nothing has been modified and should return true
            describe('and the chain does not contain any invalid blocks', () =>{

                it('returns true', ()=>{
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);

                });
            });
        });
        
    });

});