const Blog = require('../models/blog');


const blog_index = (req,res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('blogs/index',{title:'All Blogs',blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
}


const blog_details = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details' , { blog: result,title: 'Blog Details'});
        })
        .catch((err) => {
            console.log(err);
        });
};



const blog_create_get = (req,res) => {
    res.render('blogs/createblog',  {title : 'New Blog' });
};



const blog_create_post = (req,res) => {
    
};



const blog_delete = (req,res) =>{
    const id = req.params.id;
 
    Blog.findByIdAndDelete(id) 
        .then((result) => {
           res.json({ redirect: '/blogs'})   
        })
        .catch((err) => {
            console.log(err);
        })
};


const blog_edit_get = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        res.status(404).send('Blog not found');
        return;
      }
      res.render('blogs/edit', { title: 'Edit Blog', blog }); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
};


const blog_edit_post = async (req, res) => {
    const { title, snippet, body } = req.body;
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
        title,
        snippet,
        body,
      }, { new: true });
  
      if (!updatedBlog) {
        res.status(404).send('Blog not found');
        return;
      }
  
      res.redirect(`/blogs/${updatedBlog._id}`); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_post,
}