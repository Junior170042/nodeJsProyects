const express = require('express');
const controller = require('../controller/blogController');
const router = express.Router();

router.get('/', controller.blog_index)

//Post method
router.post('/', controller.blog_create_post)

//create blog
router.get('/create', controller.blog_create_get)

//get single blog
router.get('/:id', controller.blog_detail)

//delete blog
router.delete('/:id', controller.blog_delete)

module.exports = router;