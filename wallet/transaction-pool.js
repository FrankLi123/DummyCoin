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


    // filter all the valid transaction from 'The Connection Pool'
    validTransactions(){
        Object.values(this.transactionMap).filter(
            transaction => Transaction.validTransaction(transaction)
        );
    }

}

module.exports = TransactionPool;