const express = require('express');
const Blockchain = require('./blockchain');

const app = express();
const blockchain = new Blockchain();

// send GET request to other server ?
app.get('/api/blocks', ( request, response) =>{

    request.json(blockchain.chain);

});

const PORT = 3000;
app.listen(PORT, () =>    console.log(`listening at localhost:${PORT}`)   );
