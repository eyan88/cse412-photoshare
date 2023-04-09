const router = require('express').Router();
const tagCtrl = require('../controllers/tagCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(tagCtrl.getAllTags)
    .post(tagCtrl.createTagOnPhoto);

router.route('/:id')
    .get(tagCtrl.getTagsOnPostId);

module.exports = router;