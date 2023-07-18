const MINE_RATE = 1000; // 1 sec = 1000 millisec

const INITIAL_DIFFICULTY = 3;
const INITIAL_NOUNCE = 0;


const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '_____',
    hash: 'hash_one',
    difficulty: INITIAL_DIFFICULTY,
    nounce: 0,
    data:[]    
};


//Set starting balance
const STARTING_BALANCE = 1000;


const REWARD_INPUT = {

    address:'*authorized-reward*'

};

const MINING_REWARD = 50;


module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE, REWARD_INPUT, MINING_REWARD };