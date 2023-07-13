const uuid = require('uuid/v1');
const { verifySignature } = require('../util');

class Transaction{

    constructor( { senderWallet, recipient, amount } ) {

        this.id = uuid();
        this.outputMap = this.createOutputmap( {senderWallet, recipient, amount} );
        this.input = this.createInput({senderWallet, outputMap: this.outputMap} );
    }

    /*Initialize a outputMap object and map recipient to their amount after the transaction  */
    createOutputmap ({ senderWallet, recipient, amount  }){
        const outputMap ={};
        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }


    createInput( { senderWallet, outputMap } ){
        return{
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(outputMap)
        };
    }

    static validTransaction(transaction){

        const { input: {amount, address, signature }, outputMap } = transaction;

        const outputTotal = Object.values(outputMap).reduce((total, outputAmount) => total + outputAmount);

        if( amount !== outputTotal ){
            console.error( `Invalid transaction from ${address}`);
            return false;
        }


        // Verify that the signature is correct

        if(!verifySignature({ publicKey: address, data: outputMap, signature} )){

            console.error(`Invalid signature from ${address}`);
            return false;

        }

        return true;
    }


    update({senderWallet, recipient, amount}){


        // update recipient amount and sender amount
        this.outputMap[senderWallet.publicKey] = this.outputMap[senderWallet.publicKey] - amount;
        this.outputMap[recipient] = amount;

        // update the attribute 'input' of this transaction object
        this.input = this.createInput({senderWallet, outputMap: this.outputMap} );

    }


}

module.exports = Transaction