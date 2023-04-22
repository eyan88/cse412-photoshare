const router = require('express').Router();
const friendCtrl = require('../controllers/friendCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .post(friendCtrl.createFriendship)
    .get(friendCtrl.getFriendsOfUserId);

    
module.exports = router;