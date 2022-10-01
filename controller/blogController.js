const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((blog) => {
            res.render('index', { title: 'All blogs', datas: blog });
        })
}

const blog_detail = (req, res) => {
    const key = req.params.id;
    Blog.findById(key)
        .then((blog) => {
            res.render('blog_detail', { title: 'Blog details', datas: blog })
        }).
        catch(err => {
            res.status(400).render('404', { title: '404' });
        })
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'New Blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch(err => { console.log(err) })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            //sending the response back to the browser
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete,
}