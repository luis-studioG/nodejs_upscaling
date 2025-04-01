const express = require('express');
const app = express();

const productsRoute = require('./routes/products');
// const coursesRoute = require('./routes/courses');
app.use('/products', productsRoute);
// app.use('/courses', coursesRoute);

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));