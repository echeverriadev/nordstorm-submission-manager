const express = require('express');
const DivisionController = require('../controllers/DivisionController');

const router = express.Router();

router.get('', DivisionController.index);

module.exports = router;