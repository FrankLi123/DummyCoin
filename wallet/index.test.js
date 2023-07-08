const { verifySignature } = require('../util');
const Wallet = require('./index');

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



});

