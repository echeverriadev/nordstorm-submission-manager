const express = require('express');
const ItemController = require('../controllers/ItemController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage: storage})

const router = express.Router();

router.get('', ItemController.index);
router.patch('/:id', ItemController.updatePatch);
router.post('', upload.single('file'), ItemController.import);

module.exports = router;