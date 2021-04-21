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
  destination: "covers/",
  filename: function (req, file, cb) {
    console.log("req", req, file.mimetype.split("/")[1]);
    const name = file.originalname.includes(" ")
      ? file.originalname.replace(" ", "_")
      : file.originalname;
    cb(null, name.includes(".") ? name : name + file.mimetype.split("/")[1]);
  },
});

let upload = multer({ storage: storage });

const router = express.Router();

router.get("/all", [auth], async (req, res) => await get_subjects(req, res));

router.get(
  "/all/:id",
  [auth],
  async (req, res) => await get_subjects(req, res)
);

router.post(
  "/",
  // [auth, admin],
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    req.body.cover = req.files["cover"][0].filename;
    req.body.maximum_marks = parseInt(req.body.maximum_marks);
    await post_subject(req, res);
  }
);

router.get(
  "/single/:id",
  [auth],
  async (req, res) => await get_subject(req, res)
);

router.put(
  "/:id",
  [auth, admin],
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
