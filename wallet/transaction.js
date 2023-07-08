const uuid = require('uuid/v1');

class Transaction{

    constructor( { senderWallet, recipient, amount } ) {

        this.id = uuid();
        this.outputMap = this.createOutputmap( {senderWallet, recipient, amount} );
    }

    /*Initialize a outputMap object and map recipient to their amount after the transaction  */
    createOutputmap ({ senderWallet, recipient, amount  }){
        const outputMap ={};
        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }

}

module.exports = Transaction