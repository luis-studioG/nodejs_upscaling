const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../utils/database');

router.use(express.json());

const books = [
    { id: uuidv4(), title: 'Book 1', author: 'Author 1', gender: 'Drama' },
    { id: uuidv4(), title: 'Book 2', author: 'Author 2', gender: 'Fiction' },
    { id: uuidv4(), title: 'Book 3', author: 'Author 3', gender: 'Crime' },
];

router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const books = await db.collection('books').find().toArray();
        res.send(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});

// SORT books by title - MUST come before /:id route
router.get('/sortByTitle', async (req, res) => {
    try {
        const db = getDb();
        const sortOrder = req.query.order === 'desc' ? -1 : 1; // Default to ascending (A-Z)
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10
        
        const sortedBooks = await db.collection('books')
            .find({})
            .sort({ title: sortOrder })
            .limit(limit)
            .toArray();

        if(sortedBooks.length === 0) {
            return res.status(404).send("No books found in the database");
        }

        const orderText = sortOrder === 1 ? 'A-Z' : 'Z-A';
        res.json({ 
            message: `Books sorted alphabetically by title (${orderText})`, 
            count: sortedBooks.length,
            books: sortedBooks 
        });
    } catch (error) {
        console.error('Error sorting books by title:', error);
        res.status(500).send('Error sorting books');
    }
});

// Find books that don't have Luis as author (case-insensitive)
router.get('/excludeAuthor/Luis', async (req, res) => {
    try {
        const db = getDb();
        const booksWithoutLuis = await db.collection('books')
            .find({ author: { $not: { $regex: /^luis$/i } } })
            .toArray();

        if(booksWithoutLuis.length === 0) {
            return res.status(404).send("No books found without Luis as author");
        }

        res.json({ 
            message: `Books that don't have Luis as author`, 
            count: booksWithoutLuis.length,
            books: booksWithoutLuis 
        });
    } catch (error) {
        console.error('Error finding books without Luis as author:', error);
        res.status(500).send('Error filtering books');
    }
});

// Check if exists a book with gender "programming"
router.get('/exists/programming', async (req, res) => {
    try {
        const db = getDb();
        const programmingBook = await db.collection('books')
            .findOne({ gender: { $regex: /^programming$/i } });

        if (programmingBook) {
            res.json({
                exists: true,
                message: "Yes, there is at least one book with genre 'programming'",
                book: programmingBook
            });
        } else {
            res.json({
                exists: false,
                message: "No books found with genre 'programming'"
            });
        }
    } catch (error) {
        console.error('Error checking for programming books:', error);
        res.status(500).send('Error checking for books');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = getDb();
        const book = await db.collection('books').findOne({ id: req.params.id });
        if(!book) return res.status(404).send("The book with the given id was not found");
        res.send(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Error fetching book');
    }
});

router.post('/', async (req, res) => {
    console.log('Request body:', req.body);
    const { error } = validateBook(req.body);
    if(error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    const book = {
        id: uuidv4(),
        title: req.body.title,
        author: req.body.author,
        gender: req.body.gender,
        createdAt: new Date()
    };

    try {
        console.log('Attempting to save book:', book);
        const db = getDb();
        const result = await db.collection('books').insertOne(book);
        console.log('Insert result:', result);
        res.status(201).send({ message: 'Book created successfully', book: book, insertedId: result.insertedId });
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).send('Error saving book to database: ' + error.message);
    }
})

router.put('/:id', async (req, res) => {
    const { error } = validateBook(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const db = getDb();
        const updateData = {
            title: req.body.title,
            author: req.body.author,
            gender: req.body.gender,
            updatedAt: new Date()
        };

        const result = await db.collection('books').updateOne(
            { id: req.params.id },
            { $set: updateData }
        );

        if(result.matchedCount === 0) {
            return res.status(404).send("The book with the given id was not found");
        }

        const updatedBook = await db.collection('books').findOne({ id: req.params.id });
        res.send({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const db = getDb();
        const book = await db.collection('books').findOne({ id: req.params.id });
        if(!book) return res.status(404).send("The book with the given id was not found");

        await db.collection('books').deleteOne({ id: req.params.id });
        res.send({ message: 'Book deleted successfully', book: book });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
})

router.get('/filter/by-author', async (req, res) => {
    const author = req.query.author;
    
    try {
        const db = getDb();
        const filteredBooks = await db.collection('books').find({ author: author }).toArray();
        
        if(filteredBooks.length === 0) {
            return res.status(404).send("No books found with the given author");
        }
        
        res.json({ message: `Books filtered with author ${author}`, books: filteredBooks });
    } catch (error) {
        console.error('Error filtering books by author:', error);
        res.status(500).send('Error filtering books');
    }
})

router.get('/filter/by-gender', async (req, res) => {
    const gender = req.query.gender;
    
    try {
        const db = getDb();
        const filteredBooks = await db.collection('books').find({ gender: gender }).toArray();
        
        if(filteredBooks.length === 0) {
            return res.status(404).send("No books found with the given gender");
        }
        
        res.json({ message: `Books filtered with gender ${gender}`, books: filteredBooks });
    } catch (error) {
        console.error('Error filtering books by gender:', error);
        res.status(500).send('Error filtering books');
    }
})

function validateBook(book) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        author: Joi.string().min(4).required(),
        gender: Joi.array().items(Joi.string()).required(),
    });
    return schema.validate(book);
}

module.exports = router;