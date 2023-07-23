// publisher and subscriber 

// less overHead


// only when inform, let others know


const redis = require('redis');


const CHANNELS ={
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub{

    constructor({ blockchain }){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        // incoming blockchain isntance = this.blockchain
        this.blockchain = blockchain;
        // Add a new Channel
        this.subscribeToChannels();


        //Set up the Event Handler
        this.subscriber.on('message',  (channel, message) => this.handleMessage(channel, message));
    }


    // When subscribed source publish something
    handleMessage(channel, message){

        console.log(`Message receive. Channel : ${channel}. Message: ${message}.`);


        const parsedMessage = JSON.parse(message);

        // if( channel === CHANNELS.BLOCKCHAIN){
        //     this.blockchain.replaceChain(parsedMessage);
        // }
        // If receive a Blockchain message, then replace the chain if needed.

        switch(channel){
            case  CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, ()=>{
                    this.transactionPool.clearBlockchainTransactions({

                        chain:parsedMessage
                    });
                });
            case  CHANNELS.TRANSACTION:
                this.transactionPool.setTransaction(parsedMessage);
                break;
            defualt:
                return;
        }


    }

    subscribeToChannels(){
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel);
        });
    }

    // non consequential messages to the same local subscriber
    publish({channel, message}){
        this.subscriber.unsubscribe( channel , ()=>{

            this.publisher.publish(channel, message, ()=>{

                this.subscriber.subscribe(channel);
            });
        });
    }


    // 
    broadcastChain(){
        this.publish ({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)

        })
    }

}


module.exports = PubSub;