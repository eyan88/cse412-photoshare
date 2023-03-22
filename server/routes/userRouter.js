const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.route('/').get(userCtrl.getUsers);

module.exports = router;