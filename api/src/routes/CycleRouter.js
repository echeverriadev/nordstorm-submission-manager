const express = require("express");
const CycleController = require("../controllers/CycleController");
const nauth = require("../middlewares/nauth");

const router = express.Router();

router.get("", nauth, CycleController.index);

module.exports = router;
