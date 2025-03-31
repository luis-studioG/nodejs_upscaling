const EventEmitter = require('events'); //CLASS -> PascalCase
class Logger extends EventEmitter {
    log(message) {
        console.log(message);
    
        //Raise event
        this.emit('messageLogged', "Hello world")
    }
}

module.exports = Logger;