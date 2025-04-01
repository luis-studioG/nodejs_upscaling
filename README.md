# NodeJS
Runtime environment and library that is used for running web applications outside the client's browser

# Modules
Every file in node is a modules accessible by console.log(module)

Every function or variable needs to be export to be accessible globaly, module.exports.[name] = [functionName / className]

$ jshint app.js - scan JS code for errors $

`
const fs = require('fs'); // Obj
logger.log('message');

fs.readdir('./', function(err, files) {
    if(err) console.log("There was an error:", err)
    else console.log("Result:", files)
})
`

# Events
1. Create a class that extendes an EventEmitter.
2. Add aditional funcitionallity inside.
3. Inside the that class whenever we want to raise an event we use "this.emit" (this reference to the class).
4. In app module use an instance of the custom class that we define that extends EventEmitter.

`
const Logger = require('./logger');
const logger = new Logger()

logger.on('messageLogged', (arg) => {
    console.log('listener called', arg);
});

logger.log('message');

// Raise event: logging (data: message)

const messageEmitter = new EventEmitter()
messageEmitter.on('', (arg) => {
    console.log(arg);
})

messageEmitter.emit('', {data: 'message'})
`

# HTTP events
1. GET
2. POST 
3. PUT
4. DELETE

# ExpressJS
Is a node js web application framework that provides broad features for building web and mobile applications. 

# Middleware
Functions that can run prior to running a HTTP request. 

`
app.use((req, res, next) => {
    console.log("Middleware called!");
    next();
})
`