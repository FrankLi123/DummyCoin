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


});

