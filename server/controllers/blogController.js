//* Contact with Database

// slugify make url beautifully
const slugify = require('slugify');
const Blogs = require('../models/blogs');
const { v4: uuidv4 } = require('uuid');

// save data
exports.create = (req, res) => {
    const { title, content, author } = req.body;
    let slug = slugify(title);

    // validate
    if (!slug) slug = uuidv4();
    switch (true) {
        // (!title) mean if title is null or title is not assigned
        case !title:
            // status 400 -> bad request
            return res.status(400).json({ error: "Please enter title." });
            break;
        case !content:
            return res.status(404).json({ error: "Please enter content." });
            break;
    }

    // save data into database
    Blogs.create({ title, content, author, slug }, (err, blog) => {

        // if an error occurred
        if (err) {
            res.status(400).json({ error: "This blog's name is already in use." })
        }
        // else
        res.json(blog)
    })
}

// Data fetching 
exports.getAllBlogs = (req, res) => {
    Blogs.find({}).exec((err, blogs) => {
        res.json(blogs);
    });
}

// Data fetching by slug (Only one blog)
exports.singleBlog = (req, res) => {
    const { slug } = req.params;
    Blogs.find({ slug }).exec((err, blog) => {
        res.json(blog[0]);
        // response return object in array (why?)
    });
}

// remove or delete blog
exports.remove = (req, res) => {
    const { slug } = req.params;
    Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
        if (err) console.log(err);
        res.json({
            message: "This blog is removed."
        })
    })
}

// update blog information
exports.update = (req, res) => {
    const { slug } = req.params;

    // desucture data info
    const { title, content, author } = req.body;
    Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec((err, blog) => {
        if(err) console.log(err);
        res.json(blog);
    })
}