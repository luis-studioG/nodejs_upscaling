# NodeJS
Runtime environment and library that is used for running web applications outside the client's browser

# Modules
Every file in node is a modules accessible by console.log(module)

Every function or variable needs to be export to be accessible globaly, module.exports.[name] = [functionName / className]

$ jshint app.js - scan JS code for errors $

# Events
1. Create a class that extendes an EventEmitter.
2. Add aditional funcitionallity inside.
3. Inside the that class whenever we want to raise an event we use "this.emit" (this reference to the class).
4. In app module use an instance of the custom class that we define that extends EventEmitter.

# HTTP events
1. GET
2. POST 
3. PUT
4. DELETE

# ExpressJS
Is a node js web application framework that provides broad features for building web and mobile applications. 
