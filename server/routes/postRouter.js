const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

router.route('/').get(postCtrl.getPosts);

module.exports = router;