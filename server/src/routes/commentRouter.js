const router = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(commentCtrl.getAllPosts)
    .post(commentCtrl.createPost);

router.route('/:id')
    .get(commentCtrl.getPostsByUserId);

module.exports = router;