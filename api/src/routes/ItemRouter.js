const express = require("express");
const ItemController = require("../controllers/ItemController");
const multer = require("multer");
const moment = require("moment");
const request = require("request");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  }
});

const storage2 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/images");
  },
  filename: function(req, file, cb) {
    let timestamp = moment().unix();
    const { id } = req.params;
    let filename =
      timestamp +
      "_" +
      id +
      "." +
      file.originalname.split(".")[file.originalname.split(".").length - 1];

    if (id !== undefined) {
      cb(null, filename);
    }
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).single("file");

const uploadImage = multer({
  storage: storage2
}).single("file");

const router = express.Router();

router.get("", ItemController.index);
router.patch("/:id", ItemController.updatePatch);
router.post("", ItemController.store);
router.post("/import", upload, ItemController.import);
router.post("/uploadPatch/:id", uploadImage, ItemController.uploadImagePatch);
router.post("/upload", uploadImage, ItemController.uploadImage);
router.get("/delete/:id", ItemController.deleteRecord);
router.get("/duplicate/:id", ItemController.duplicateItem);

module.exports = router;
