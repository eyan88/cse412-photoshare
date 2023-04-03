const router = require('express').Router();
const likeCtrl = require('../controllers/likeCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(likeCtrl.getAllPosts)
    .post(likeCtrl.createPost);

router.route('/:id')
    .get(likeCtrl.getPostsByUserId);

module.exports = router;