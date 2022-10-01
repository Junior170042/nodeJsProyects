const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/blogRoutes');

const app = express();

//MangoDb connection
const dbUri = 'mongodb+srv://J7coder:Vernard95@nodebasic.vkahtye.mongodb.net/nodeBlogs?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(4000))
    .catch(err => console.log(err));

//middleware static file (get access to any files)
app.use(express.static('public'));

//Receiving data into a json format
app.use(express.urlencoded({ extended: true }))

//Using the blogRoutes file
app.use('/blogs', appRoutes)


//register view engine configurations
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

// not found page when there is no page for the requested url
app.use((req, res) => {
    res.status(400).render('404', { title: '404' });
})
