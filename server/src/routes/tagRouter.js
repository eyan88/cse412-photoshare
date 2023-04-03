const router = require('express').Router();
const tagCtrl = require('../controllers/tagCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(tagCtrl.getAllPosts)
    .post(tagCtrl.createPost);

router.route('/:id')
    .get(tagCtrl.getPostsByUserId);

module.exports = router;