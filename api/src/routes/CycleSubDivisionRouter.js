const express = require("express");
const router = express.Router();
const CycleSubDivisionController = require("../controllers/CycleSubDivisionController");
const nauth = require("../middlewares/nauth");

router.post("", nauth, CycleSubDivisionController.addCycleSubDivisionRow);

module.exports = router;
