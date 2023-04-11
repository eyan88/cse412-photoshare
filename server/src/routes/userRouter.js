const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(userCtrl.getUsers)
    .post(userCtrl.createUser);

router.route('/login')
    .post(userCtrl.loginUser);
    
router.route('/:id')
    .get(userCtrl.getUserById)
    .delete(userCtrl.deleteUser);


module.exports = router;