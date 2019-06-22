const express = require('express');
const ItemLogController = require('../controllers/ItemLogController');

const router = express.Router();

router.get('/:_fk_item_editorial', ItemLogController.index);
router.post('/addItemLog/:_pk_item_editorial', ItemLogController.addItemLog);

module.exports = router;