require('dotenv').config();
const express = require('express');
const app = express();

// const { mongoConnect } = require('./config/mongo');
// const logger = require('./middleware/logger');
// const productsRoute = require('./src/api/routes/products');
// const coursesRoute = require('./src/api/routes/courses');
// const usersRoute = require('./routes/users')
// const booksRoute = require('./routes/books');
const studentsRoute = require('./api/routes/students');

// Apply logger middleware to all routes
// app.use(logger);

// app.use('/products', productsRoute);
// app.use('/courses', coursesRoute);
// app.use('/users', usersRoute);
// app.use('/books', booksRoute);
app.use('/students', studentsRoute);

app.get('/', (req, res) => {
    res.send("Hello App!!!!")
});

app.use((req, res) => {
  res.status(404).send("Page not found!")  
});

// mongoConnect(() => {
//     app.listen(port, () => console.log(`Listening on port ${port}...`));
// })

module.exports = app;