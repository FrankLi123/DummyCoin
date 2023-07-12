const Transaction = require('./transaction');

const Wallet = require('./index');
const { verifySignature } = require('../util');

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



    describe('input', ()=>{

        it('has an `input`', ()=>{

            expect(transaction).toHaveProperty('input');
        });

        it('has a `timestamp` in the input', () =>{

            expect(transaction.input).toHaveProperty('timestamp');

        });

        it('set the `amount` to the `senderWallet` balance', ()=>{
            expect(transaction.input.amount).toEqual(senderWallet.balance);
        });


        it('sets the `address` to be the `senderWallet` publicKey', ()=>{

            expect(transaction.input.address).toEqual(senderWallet.publicKey);
        });

        it('signs the input', () =>{
            expect(
            verifySignature({
                publicKey: senderWallet.publicKey,
                data: transaction.outputMap,
                signature: transaction.input.signature
            })).toBe(true);

        })

    });

    describe('validTransaction()', () => {

        let errorMock;

        beforeEach(() => {

            errorMock = jest.fn();
            global.console.error = errorMock;
        });


        describe('when the transaction is valid', () =>{

            it('returns true', () =>{
                expect(Transaction.validTransaction(transaction)).toBe(true);
            });
        });

        describe('when transaction is invalid', () =>{


            describe( 'a transaction outputMap value is invalid', ()=> {

                it('returns false and logs error ', () =>{

                        transaction.outputMap[senderWallet.publicKey] = 999999;
                        expect(Transaction.validTransaction(transaction)).toBe(false);
                        expect(errorMock).toHaveBeenCalled();
                });
            });
            describe( 'the transaction input signature is invalid', ()=> {
                it('returns false and logs error', () =>{

                    transaction.input.signature = new Wallet().sign('data');
                    expect(Transaction.validTransaction(transaction)).toBe(false);
                    expect(errorMock).toHaveBeenCalled();
                });

            });

        });

    });
});