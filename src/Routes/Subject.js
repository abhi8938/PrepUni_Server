const {
  get_subject,
  get_subjects,
  post_subject,
  update_subject,
} = require("../Controllers/Subject");

const admin = require("../Middlewares/admin");
const auth = require("../Middlewares/auth");
const express = require("express");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

let upload = multer({ storage: storage });
const router = express.Router();

router.get("/all", async (req, res) => await get_subjects(req, res));

router.get("/all/:id", async (req, res) => await get_subjects(req, res));

router.post(
  "/",
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    console.log("cover", req.files);
    req.body.cover = req.files["cover"][0].filename;
    req.body.maximum_marks = parseInt(req.body.maximum_marks);
    await post_subject(req, res);
  }
);

router.get("/single/:id", async (req, res) => await get_subject(req, res));

router.put(
  "/:id",
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    if (req.files !== undefined) {
      if (req.files.length !== undefined) {
        req.body.cover = req.files["cover"][0].filename;
      }
    }
    await update_subject(req, res);
  }
);

module.exports = router;
