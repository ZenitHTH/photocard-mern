const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const imageSchema = require("../models/image.db");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
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
  .post(upload.single("myImage"), (req, res) => {
    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString("base64");
    const schemaImg = {
      name: req.body.name,
      img: {
        contnetType: req.file.mimetype,
        data: Buffer.from(encode_img, "base64"),
      },
    };
    imageSchema.create(schemaImg, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved to database");
        res.json(schemaImg);
        fs.unlink(req.file.path, (err) => {
          if (err) console.log(err);
        });
      }
    });
  });

module.exports = router;
