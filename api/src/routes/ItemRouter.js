const express = require('express');
const ItemController = require('../controllers/ItemController');

const router = express.Router();

router.get('', ItemController.index);
router.patch('/:id', ItemController.updatePatch);

module.exports = router;