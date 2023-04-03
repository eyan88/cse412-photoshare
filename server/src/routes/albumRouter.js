const router = require('express').Router();
const albumCtrl = require('../controllers/albumCtrl');
const auth = require('../middleware/auth');

router.route('/')
    .get(albumCtrl.getAllAlbums)
    .post(albumCtrl.createAlbum);

router.route('/:id')
    .get(albumCtrl.getAlbumById);

router.route('/user/:id')
    .get(albumCtrl.getAlbumsByUserId);

module.exports = router;