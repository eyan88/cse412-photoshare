const multer = require('multer');
const uniqid = require('uniqid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uniqid());
    }
})

const upload = multer({storage: storage});

module.exports = upload;