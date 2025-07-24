require('dotenv').config();
const express = require('express');
const app = express();

// const { mongoConnect } = require('./utils/database');
const logger = require('./middleware/logger');
const productsRoute = require('./routes/products');
const coursesRoute = require('./routes/courses');
// const usersRoute = require('./routes/users')
// const booksRoute = require('./routes/books');
const studentsRoute = require('./routes/students');

// Apply logger middleware to all routes
app.use(logger);

app.use('/products', productsRoute);
app.use('/courses', coursesRoute);
// app.use('/users', usersRoute);
// app.use('/books', booksRoute);
app.use('/students', studentsRoute);

app.get('/', (req, res) => {
    res.send("Hello App!!!!")
});

app.use((req, res) => {
  res.status(404).send("Page not found!")  
});

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// mongoConnect(() => {
//     app.listen(port, () => console.log(`Listening on port ${port}...`));
// })
