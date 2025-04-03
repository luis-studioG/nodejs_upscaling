const express = require('express');
const app = express();

const productsRoute = require('./routes/products');
const coursesRoute = require('./routes/courses');
const usersRoute = require('./routes/users')

app.use('/products', productsRoute);
app.use('/courses', coursesRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    res.send("Hello App!!!!")
});

app.use((req, res) => {
  res.status(404).send("Page not found!")  
});


// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));