const express = require('express');
const Blockchain = require('./blockchain');
const bodyParser = require('body-parser');
const PubSub = require('./pubsub');


const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

// delay is 1000 millisecond
setTimeout(() => pubsub.broadcastChain(), 1000);



app.use(bodyParser.json());

// send GET request to other server ?
app.get('/api/blocks', ( request, response) =>{

    response.json(blockchain.chain);

});

app.post('/api/mine', (req, res) => {

    const {data} = req.body;


    blockchain.addBlock({data});

    // redirect to block display page
    res.redirect('/api/blocks');

});

const PORT = 3000;
app.listen(PORT, () =>    console.log(`listening at localhost:${PORT}`)   );
