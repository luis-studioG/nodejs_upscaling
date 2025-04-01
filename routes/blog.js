const Joi = require('joi');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

let blogs = [];

// GET 
app.get('/api/blogs', (req, res) => {
    res.send(blogs);
})

// GET SINLGE BLOG
app.get('/api/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) return res.status(404).send("The blog with the given id was not found");
    res.send(blog);
});

// POST
app.post('/api/blogs', (req, res) => {
    const { error } = validateBlogs(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const blog = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: new Date().toISOString(),
    }
    blogs.push(blog);
    res.send(blog);
})

// PUT
app.put('/api/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if(!blog) return res.status(404).send("The blog with the given id was not found")

    const { error } = validateBlogs(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    blog.title = req.body.title; 
    blog.content = req.body.content;
    blog.author = req.body.author; 
    res.send(blog);
})

// DELETE
app.delete('/api/blogs/:id', (req, res) => {
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) return res.status(404).send("The blog with the given id was not found");

    const index = blogs.indexOf(blog);
    blogs.splice(index, 1);
    
    res.send(blog);
});

function validateBlogs(blog) {
    const schema = Joi.object().keys({
        id: Joi.string(),
        title: Joi.string().min(3).required(),
        content: Joi.string().min(10).required(),
        author: Joi.string().required(),
        createdAt: Joi.date().timestamp(),
    })
    return schema.validate(blog);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));