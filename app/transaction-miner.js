class TransactionMiner{


    constructor({blockchain, transactionPool, wallet, pubsub}){

        this.blockchain = blockchain;

        this.transactionPool = transactionPool;

        this.wallet = wallet;

        this.pubsub = pubsub;
    }

    mineTransactions(){

        const validTransactions = this.transactionPool.validTransactions();
       
        // get the transaction pool's valid transactions
        Transaction.rewardTransaction({mineWallet : this.wallet});

        //generate reward of the miners
        validTransactions.push( Transaction.rewardTransaction({minerWallet: this.wallet}));

        // add a block consisting of these transactions to the blockchain
        this.blockchain.addBlock({data:validTransactions});

        // broadcast the updated blockchain
        this.pubsub.broadcastChain();

        // clear the pool
        this.transactionPool.clear();
    }
}

module.exports = TransactionMiner