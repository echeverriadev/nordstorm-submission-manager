const express = require("express");
const RmsController = require("../controllers/RmsController");

const router = express.Router();

router.get(
  "/getItemDataByVpnDepartment",
  RmsController.getItemDataByVpnDepartment.bind(RmsController)
);

module.exports = router;
