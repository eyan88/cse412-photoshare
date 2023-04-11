const router = require('express').Router();
const likeCtrl = require('../controllers/likeCtrl');
const auth = require('../middleware/auth');

router.route('/:id')
    .get(likeCtrl.getLikesByPhotoId)
    .post(likeCtrl.createLike);

module.exports = router;