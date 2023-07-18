class TransactionPool{


    constructor(){

        this.transactionMap = {};
    }

    clear(){
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

    // clear all the transactions that are on the blockchain from Connection Pool
    clearBlockchainTransactions({chain}){

        for( let i = 1; i< chain.length; i++){
            const block = chain[i];
            for( let transaction of block.data){
                if(this.transactionMap[transaction.id]){
                    delete this.transactionMap[transaction.id];
                }
            }
        }
    }
}

module.exports = TransactionPool;