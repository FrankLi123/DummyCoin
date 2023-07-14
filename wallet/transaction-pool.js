class TransactionPool{


    constructor(){

        this.transactionMap = {};
    }

    setTransaction(transaction){
        this.transactionMap[transaction.id] = transaction;
    }

    
    // check for one specific transaction

    existingTransaction({ inputAddress }){

        const transactions = Object.values(this.transactionMap);

        return transactions.find( transaction => transaction.input.address === inputAddress );
    }
}

module.exports = TransactionPool;