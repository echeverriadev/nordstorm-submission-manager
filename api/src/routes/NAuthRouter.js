const express = require("express");
const NAuthController = require("../controllers/NAuthController");

const router = express.Router();

router.post("/login", NAuthController.login.bind(NAuthController));
router.post("/setCookie", NAuthController.setCookie.bind(NAuthController));
router.post("/logout", NAuthController.logout.bind(NAuthController));

module.exports = router;
