const express = require('express');
const router = express.Router();
const { requireLogin } = require('../controllers/authController');

const { create, getAllBlogs, singleBlog, remove, update } = require('../controllers/blogController');

router.post('/create', requireLogin, create)
router.delete('/blog/:slug', requireLogin, remove)
router.put('/blog/edit/:slug', requireLogin, update) // update blog information by slug

// general user can see this without logged in
router.get('/blogs', getAllBlogs)
router.get('/blog/:slug', singleBlog)

module.exports = router;