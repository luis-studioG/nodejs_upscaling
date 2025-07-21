require('dotenv').config();
const express = require('express');
const app = express();

const { mongoConnect } = require('./utils/database');
const logger = require('./middleware/logger');
const productsRoute = require('./routes/products');
const coursesRoute = require('./routes/courses');
const usersRoute = require('./routes/users')
const booksRoute = require('./routes/books');

// Apply logger middleware to all routes
app.use(logger);

app.use('/products', productsRoute);
app.use('/courses', coursesRoute);
app.use('/users', usersRoute);
app.use('/books', booksRoute);

app.get('/', (req, res) => {
    res.send("Hello App!!!!")
});

app.use((req, res) => {
  res.status(404).send("Page not found!")  
});

// PORT 
const port = process.env.PORT || 3000;

mongoConnect(() => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
})
