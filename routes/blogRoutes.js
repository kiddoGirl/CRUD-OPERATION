const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();


router.get('/',blogController.blog_index);
router.get('/:id/edit', blogController.blog_edit_get);
router.get('/createblog',blogController.blog_create_get);
router.get('/:id',blogController.blog_details);
router.delete('/:id',blogController.blog_delete);
router.post('/:id', blogController.blog_edit_post);




module.exports = router;