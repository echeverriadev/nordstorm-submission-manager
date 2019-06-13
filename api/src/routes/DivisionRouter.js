const express = require("express");
const DivisionController = require("../controllers/DivisionController");
const nauth = require("../middlewares/nauth");

const router = express.Router();

router.get("", nauth, DivisionController.index);

module.exports = router;
