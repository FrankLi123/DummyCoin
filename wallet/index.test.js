const { verifySignature } = require('../util');
const Wallet = require('./index');
const Blockchain = require('../blockchain');
const { STARTING_BALANCE } = require('../config');
describe('Wallet', () => {

    let wallet;


    beforeEach( () => {

        wallet = new Wallet();

    });


    // check whether or not it has balance

    it ('wallet has a `balance`', () =>{

        expect(wallet).toHaveProperty('balance');

    });


    it('wallet has a `public key`', () => {

        console.log(wallet.publicKey);

        expect(wallet).toHaveProperty('publicKey');

    });



    // SIGN DATA NAD VERFIY SIGNATURE
    describe('signing data', ()=>{

        const data = 'footbar';

        it('verifies a signature', () =>{

            expect(
            verifySignature({
                publicKey: wallet.publicKey,
                data: data,
                signature: wallet.sign(data)
            })).toBe(true);

        });

        it('does not verify an valid signature', () =>{

            test_wallet = new Wallet();
            expect(
            verifySignature({
                publicKey: wallet.publicKey,
                data: data,
                signature: test_wallet.sign(data)
            })).toBe(false);
            
        });


    });


    describe('calculateBalance()', ()=>{

        let blockchain;

        beforeEach(()=>{
            blockchain = new Blockchain();
        });

        describe('and there are no outputs for the wallet', ()=>{

            it('returns the `STARTING_BALANCE`', ()=>{
                expect (
                    Wallet.calculateBalance({
                        chain: blockchain.chain,
                        address: wallet.publicKey
                    })
                ).toEqual(STARTING_BALANCE);
            });
        });

        describe('amd there are outputs for the wallet', ()=>{

            let transactionOne, transactionTwo;

            beforeAllEach(()=>{
                transactionOne = new Wallet().createTransaction({
                    recipient:wallet.publicKey,
                    amount:50
                });
                transactionTwo = new Wallet().createTransaction({
                    recipient:wallet.publicKey,
                    amount:60
                });          
                
          
                blockchain.addBlock({data:[transactionOne, transactionTwo ]});

            });
        });

        it('adds the sum of all outputs to the wallet balance', ()=>{
            expect(
                Wallet.calculateBalannce({
                    chain:blockchain.chain,
                    address: wallet.publicKey
                })
                
                ).toEqual(
                    STARTING_BALANCE + tranasctionOne.outputap[wallet.publicKey] + transactionTwo.outputMap[wallet.publicKey]
                );
            });
        });
});

