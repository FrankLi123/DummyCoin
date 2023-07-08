const hexToBinary = require('hex-to-binary');
const crypto = require('crypto');
const cryptoHash = (...inputs) =>{



    const hash = crypto.createHash('sha256');


    hash.update(inputs.sort().join(' '));

    // return hexToBinary(hash.digest('hex')); // display as 'hex' value
    return (hash.digest('hex'));
};


module.exports = cryptoHash;