const express = require('express');
const CycleController = require('../controllers/CycleController');

const router = express.Router();

router.get('', CycleController.index);

module.exports = router;