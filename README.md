# NodeJS
Runtime environment and library that is used for running web applications outside the client's browser

Run node app.js to run the application.

# Modules
Every file in node is a modules accessible by console.log(module)

Every function or variable needs to be export to be accessible globaly, module.exports.[name] = [functionName / className]

$ jshint app.js - scan JS code for errors $

```
const fs = require('fs'); // Obj
logger.log('message');

fs.readdir('./', function(err, files) {
    if(err) console.log("There was an error:", err)
    else console.log("Result:", files)
})
```   

# Events
1. Create a class that extendes an EventEmitter.
2. Add aditional funcitionallity inside.
3. Inside the that class whenever we want to raise an event we use "this.emit" (this reference to the class).
4. In app module use an instance of the custom class that we define that extends EventEmitter.

```
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
```

# HTTP events
1. GET
2. POST 
3. PUT
4. DELETE

# ExpressJS
Is a node js web application framework that provides broad features for building web and mobile applications. 

# Middleware
Functions that can run prior to running a HTTP request. 

Example: /middleware/logger.js

```
app.use((req, res, next) => {
    console.log("Middleware called!");
    next();
})
```

# Mongo DB
1. brew tap mongodb/brew
2. brew install mongodb-community@7.0
3. mongod --version
4. brew services start mongodb-community@7.0
5. brew services list
6. Download MongoDB Compass from: https://www.mongodb.com/try/download/compass
7. Open MongoDb Compass and enter connection, click connect.
8. mongosh

CRUD Operations within Mongo DB: https://www.youtube.com/watch?v=c2M-rlkkT5o
- insertOne();
- find(); 
- updateOne();
- deleteOne();

Logical operators:
- $eq: equal to
- $ne: not equal to
- $gt: greater than
- $gte: greater than or equal to
- $lt: less than
- $lte: less than or equal to
- $in: in
- $nin: not in
- $and: and
```
db.collection.find({
  $and: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})
```
- $or: or
```
db.collection.find({
  $or: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})
```
- $not: not
```
db.collection.find({
  $not: {
    age: { $gt: 25 }
  }
})
```
- $exists: exists
```
db.collection.find({
  $exists: {
    age: true
  }
})
```
- $nor: nor
```
db.collection.find({
  $nor: [
    { age: { $lt: 20 } },
    { city: "Los Angeles" }
  ]
})
```
- $regex: regex (case-insensitive)
```
db.collection.find({
  name: { $regex: "john" }
})
```
