const uuid = require('uuid/v1');

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

}

module.exports = Transaction