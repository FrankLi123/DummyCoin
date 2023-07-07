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


        //trigger the event

        this.subscriber.on('message',  (channel, message) => this.handleMessage(channel, message));
    }

    handleMessage(channel, message){
        console.log(`Message receive. Channel : ${channel}. Message: ${message}.`);
    }

    subscribeToChannels(){
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel);
        });
    }


    publish({channel, message}){
        this.publisher.publish(channel, message);
    }


    // 
    broadcastChain(){

        this.publish ({
            channel : CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
            
        })
    }

}


module.exports = PubSub