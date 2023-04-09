const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(postCtrl.getAllPosts)
    .post(postCtrl.createPost);

router.route('/user/:id')
    .get(postCtrl.getPostsByUserId);

router.route('/:id')
    .get(postCtrl.getPostById);

module.exports = router;