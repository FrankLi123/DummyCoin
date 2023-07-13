const cryptoHash = require("./crypto-hash");

describe('cryptoHash()', ()=>{

    it('generates a SHA-256 hashed ouput', ()=>{

        expect(cryptoHash('foo')).toEqual('b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b');
    });


    it('produce the same hash with the same input argumnets in any order', () =>{


        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three','one', 'two') );

    });


    it('produces a unique hash when the properties have changed on an input', () => {

        const foo = {};

        const originalHash = cryptoHash(foo);

        foo['b'] = 'b';


        expect(originalHash).not.toEqual(cryptoHash(foo));
    });


});