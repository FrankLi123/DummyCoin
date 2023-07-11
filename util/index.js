const EC = require('elliptic').ec; // Ec - elliptic cryptography
const cryptoHash = require('./crypto-hash');
const ec = new EC('secp256k1');


// Implement VerifySignature

const verifySignature = ({publicKey, data, signature}) =>{

    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex'); // coming in 'hex' form

    return keyFromPublic.verify( cryptoHash(data), signature );


};

module.exports = {ec, verifySignature, cryptoHash };

