const express = require('express');
const Blockchain = require('./blockchain/index');
const bodyParser = require('body-parser');
const PubSub = require('./app/pubsub');

const TransactionPool = require('./wallet/transaction-pool');
const Wallet = require('./wallet/index')
const TransactionMiner = require("./app/transaction-miner");

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const transactionMiner = new TransactionMiner({blockchain, transactionPool, wallet, pubsub});

const transactionPool = new TransactionPool();
const wallet = new Wallet();

const request = require('request');

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS =  `http://localhost:${DEFAULT_PORT}`;



// delay is 1000 millisecond
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());

// send GET request to other server ?
app.get('/api/blocks', ( request, response) =>{

    response.json(blockchain.chain);

});

// Request to create a new transaction
app.post('/api/transact', ( req , res ) => {

    const { amount, recipient} = req.body;

    let transaction = transactionPool.existingTransaction({ inputAddress: wallet.publicKey});
    
    // Only create new Transaction + update existed Transactions
    // ( we could check from TransactionPool)
    
    try {

        // check whetehr the transaction already exists
        if( transaction) {

            transaction.update({ senderWallet: wallet, recipient, amount});
        
        }else{

            transaction = wallet.createTransaction({recipient, amount, chiain: blokhchain.chain});
        }
    } catch(error){

        return res.status(400).json({ type: 'error', message: error.message });

    }

    transactionPool.setTransaction(transaction);

    console.log('transactionPool', transactionPool);

    res.json({ type: 'success', transaction});
});



app.post('/api/mine', (req, res) => {

    const {data} = req.body;


    blockchain.addBlock({data});

    // broadcast the new mined block to all subscriber
    pubsub.broadcastChain();
    
    // redirect to block display page
    res.redirect('/api/blocks');

});


app.get('/api/mine-transactions', (req, res)=>{
    transactionMiner.mineTransactions();
    res.redirect('/api/blocks');
});


const syncChains = ()=>{

    console.log('hello, this is syncChains()')

    request( {  url:`${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) =>{

        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body);

            console.log('replace chain on a sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }

    });
};



let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true'){

    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () =>  {
  console.log(`listening at localhost:${PORT}`);
  
  
  if( PORT !== DEFAULT_PORT){
    syncChains();
  }
});