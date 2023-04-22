const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(userCtrl.getUsers)
    .post(userCtrl.createUser);

router.route('/login')
    .post(userCtrl.loginUser);
    
router.route('/search/:id')
    .get(userCtrl.getUserById)
    .delete(userCtrl.deleteUser);

router.route('/search')
    .post(userCtrl.getUserByName);


module.exports = router;