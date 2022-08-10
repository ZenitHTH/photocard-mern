const express = require("express");
const multer = require("multer");
const fs = require("fs");
const uuid = require("uuid");

const router = express.Router();

const imageSchema = require("../models/image.db");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid.v4()}.${file.mimetype.split("/")[1]}`);
  }
});
const upload = multer({ storage: storage });

router
  .route("/")
  .get((req, res, next) => {
    imageSchema.find((err, data) => {
      if (err) {
        console.log(err);
      }
      res.json(data);
    });
  })
  .post(upload.single("image"), (req, res, next) => {
    if (!req.file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    } else {
    
     const schemaImg = {
      name: req.file.filename,
      title:req.body.title
    };
    imageSchema.create(schemaImg, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved to database");
        res.json(schemaImg);
      }
    });
  }
  });

router.route("/:filename").get((req, res) => {
  res.sendFile(path.resolve(`./public/uploads/${req.params.filename}`));
});
module.exports = router;
