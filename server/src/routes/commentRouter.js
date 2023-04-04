const router = require('express').Router();
const commentCtrl = require('../controllers/commentCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(commentCtrl.getAllComments)
    .post(commentCtrl.createComment);

router.route('/:id')
    .get(commentCtrl.getCommentsOnPost);

module.exports = router;