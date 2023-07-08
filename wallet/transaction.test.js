const Transaction = require('./transaction');

const Wallet = require('./index');

describe('Transaction', () => {

    let transaction;


    let senderWallet;


    let recipient;

    let amount;


    beforeEach (() => {

        senderWallet = new Wallet();
        recipient = 'recipient-public-key';
        amount = 50;
        transaction = new Transaction({senderWallet, recipient, amount});
    });

    // test whether the transaction has an id
    it('hash an `id`', () => {
        expect(transaction).toHaveProperty('id');
    });

    // output, map every recipient to their received amount
    describe('outputMap', () => {
        it('has an `outputMap`', ()=>{
            expect(transaction).toHaveProperty('outputMap');
        });


        it('outputs the amount to the recipient', () =>{
            expect(transaction.outputMap[recipient]).toEqual(amount);
        });


        it('outputs the remaining balance for the `senderWallet`', ()=>{

            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
        })


    });

});