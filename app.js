// const fs = require('fs'); // Obj
// logger.log('message');

// fs.readdir('./', function(err, files) {
//     if(err) console.log("There was an error:", err)
//         else console.log("Result:", files)
// })

// Events


const Logger = require('./logger');
const logger = new Logger()

logger.on('messageLogged', (arg) => {
    console.log('listener called', arg);
});

logger.log('message');

//Raise event: logging (data: message)
// const messageEmitter = new EventEmitter()
// messageEmitter.on('', (arg) => {
//     console.log(arg);
// })

// messageEmitter.emit('', {data: 'message'})

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write("Hello world");
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log("New connection..");
});

server.listen(3000);

console.log("listening on port 3000...");