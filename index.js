const express = require('express');
const Blockchain = require('./blockchain');
const bodyParser = require('body-parser');

const app = express();
const blockchain = new Blockchain();


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
