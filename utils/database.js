const { MongoClient } = require('mongodb');
require('dotenv').config();

const URI = process.env.DATABASE_URL;

if (!URI) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

let _db;

const mongoConnect = callback => {
    MongoClient.connect(URI)
    .then(client => {
        console.log("Connected to MongoDB!");
        _db = client.db();
        callback();
    }).catch(err => {
        console.error("MongoDB Connection Error:", err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error("No database found!");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;