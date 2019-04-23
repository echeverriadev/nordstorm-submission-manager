const express = require('express');
const ItemController = require('../controllers/ItemController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const upload = multer({
    storage: storage,
    fileFilter : function(req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

const uploadImage = multer({
    storage: storage2
}).single('file');

const router = express.Router();

router.get('', ItemController.index);
router.patch('/:id', ItemController.updatePatch);
router.post('', ItemController.store);
router.post('/import', upload, ItemController.import);
router.post('/upload', uploadImage, ItemController.uploadImage);

module.exports = router;