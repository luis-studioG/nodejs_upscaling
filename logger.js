const EventEmitter = require('events'); //CLASS

// console.log(__filename);
// console.log(__dirname);

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
    
        //Raise event
        this.emit('messageLogged', { id: 1, url: 'http://myblog.io'})
    }
}

module.exports = Logger;