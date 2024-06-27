const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const Blog = require('./models/blog');


const app = express();


const dbURI = 'mongodb+srv://manjubashini2110:Manju03@cluster0.adkmyfp.mongodb.net/artizen-DB'
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));


//register view engine
app.set('view engine','ejs');
require('dotenv').config();

app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

const multer = require('multer');

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });


app.get('/', (req, res) => {
   res.redirect('/blogs');
});


app.get('/about',(req,res) => {
    res.render('about',  {title : 'About' });
});

app.use('/blogs',blogRoutes); 


 
app.post('/', upload.single('image'), async(req, res, next) => {
    console.log(req.file);
    var obj = {
        title: req.body.title,
        snippet: req.body.snippet,
        body:req.body.body,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    await Blog.create(obj)
    .then ((err, item) => {
        res.redirect('/blogs');  
    });
   
});





//404 page
app.use((req,res) => {
    res.status(404).render('404',  {title : '404' });
}); 