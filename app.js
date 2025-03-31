// const fs = require('fs'); // Obj
// logger.log('message');

// fs.readdir('./', function(err, files) {
//     if(err) console.log("There was an error:", err)
//         else console.log("Result:", files)
// })

// Events


// const Logger = require('./logger');
// const logger = new Logger()

// logger.on('messageLogged', (arg) => {
//     console.log('listener called', arg);
// });

// logger.log('message');

//Raise event: logging (data: message)
// const messageEmitter = new EventEmitter()
// messageEmitter.on('', (arg) => {
//     console.log(arg);
// })

// messageEmitter.emit('', {data: 'message'})
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send("Hello Wold!!!!")
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id was not found")
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course); // the client need to know the coruse added
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id was not found")

   
    const { error } = validateCourse(req.body); // Validate result.error
    if(error) return res.status(400).send(error.details[0].message);     // If invalid return 400 - bad request

    course.name = req.body.name; // Update the coruse 
    res.send(course); // Return the the updated course
})

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id was not found")

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
    })
    return schema.validate(course);
}

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));