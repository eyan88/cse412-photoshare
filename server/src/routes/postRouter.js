const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
    .get(postCtrl.getAllPosts)
    .post(upload.single('image'), postCtrl.createPost);

router.route('/user/:id')
    .get(postCtrl.getPostsByUserId);

router.route('/:id')
    .get(postCtrl.getPostById)
    .delete(postCtrl.deletePost);

module.exports = router;