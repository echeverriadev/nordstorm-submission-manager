const express = require('express');
const ItemLogController = require('../controllers/ItemLogController');

const router = express.Router();

router.get('', ItemLogController.index);

module.exports = router;