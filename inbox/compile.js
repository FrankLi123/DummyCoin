const path = require('path');
const fs = require('fs');
const solc = require('solc');
// use path for cross-platform - window / mac


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// utf8 - encoding methods
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];