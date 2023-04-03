const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(postCtrl.getAllPosts)
    .post(postCtrl.createPost);

router.route('/:id')
    .get(postCtrl.getPostsByUserId);

module.exports = router;