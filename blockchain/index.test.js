const Blockchain = require('.');
const Block = require('./block');

const cryptoHash = 

describe('Blockchain', () => {


        // make it a dynamic variable that could be changed later 
        let blockchain;
        let newChain;
        let originalChain;

        // reset blockchain obj to a new instance
        beforeEach(() =>{
            blockchain = new Blockchain();
            newChain = new Blockchain();

            originalChain = blockchain.chain;
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
   
            describe('when the chain does not start with the genesis block', () => {

                it('return false', () => {

                    blockchain.chain[0] = {data: 'fake-genesis'};

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

                            blockchain.chain[2].lastHash = 'broken-lastHash';

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

                    describe('and the chain contains a block with a jumped difficulty', ()=>{

                        it('returns false', () =>{

                            const lastBlock = blockchain.chain[blockchain.chain.length-1];


                            Block.adjustDifficulty(lastBlock, timeStamp)
                        });

                    });
            });



    });



    // test on the func 'replaceChain()'

    describe('replaceChain()', ()=>{

        let errorMock, logMock;

        beforeEach(() =>{

            errorMock = jest.fn();
            logMock = jest.fn();


            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe('when the new chain is not longer', ()=> {
           
            beforeEach(() =>{
                newChain.chain[0] = {new: 'chain'};
                
                blockchain.replaceChain(newChain.chain);


            });

            it('does not replace the chain', () =>{
            
                expect(blockchain.chain).toEqual(originalChain);
            });

            
            it('logs an error', ()=>{
                expect(errorMock).toHaveBeenCalled();
            });

        });

        describe('when the new chain is longer', ()=>{

            beforeEach(() =>{
                newChain.addBlock({data: 'Bears'});
                newChain.addBlock({data: 'Beets'});
                newChain.addBlock({data: 'Basketball'});    
            });


            describe('and the chain is invalid', ()=>{

                it('does not replace the chain', () =>{

                    newChain.chain[2].hash = 'some-incorrect-hash';
                    blockchain.replaceChain(newChain.chain);

                    expect(blockchain.chain).toEqual(originalChain);

                });
            });

            describe('and the chain is valid', () =>{

                beforeEach(() =>{

                    blockchain.replaceChain(newChain.chain);


                });

                it('replaces the chain', () =>{
                    expect(blockchain.chain).toEqual(newChain.chain);            

                });

                // it('log about the chain replacement', () =>{
                //     expect(logMock).toHaveBeenCalled();
                // });

            });

        });

    });






});