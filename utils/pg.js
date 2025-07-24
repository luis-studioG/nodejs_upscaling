const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'luisfaria',
    database: 'students',
    password: process.env.PG_PASSWORD
});

client.connect().then(() => {
    console.log('Connected to PostgreSQL');
}).catch(err => {
    console.error('Error connecting to PostgreSQL', err);
});

module.exports = { client };