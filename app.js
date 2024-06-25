const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const blogDetails = require('./Models/blogdetails.js')
const dotenv = require('dotenv')

dotenv.config()
const uri = process.env.mongodb_uri
mongoose.connect(uri);

const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const data = req.body;
        const result = await blogDetails.create(data);
        console.log(result);
        res.status(201).redirect('/thank-you');
    }
    catch (error) {
        console.log(error);
        res.status(500).json();
    }
})

app.get("/blog/:id", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
   });

app.get('/api/blog/:id', async (req, res) => {
    const id = req.params.id;
    const details = await blogDetails.findOne({ blogId: id })
    console.log(details);
    res.json(details);
});


app.listen(3002, () => {
    console.log("The server is starting")
})