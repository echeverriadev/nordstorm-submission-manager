const express = require("express");
const SubDivisionController = require("../controllers/SubDivisionController");
const nauth = require("../middlewares/nauth");

const router = express.Router();

router.get("/:idDivision", nauth, SubDivisionController.index);

module.exports = router;
