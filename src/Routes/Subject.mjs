import {
  get_subject,
  get_subjects,
  post_subject,
  update_subject,
} from "../Controllers/Subject.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";
import multer from "multer";

let upload = multer({ dest: "uploads" });
const router = express.Router();

router.get("/", async (req, res) => await get_subjects(req, res));

router.post(
  "/",
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    req.body.cover = req.files["cover"][0].filename;
    req.body.maximum_marks = parseInt(req.body.maximum_marks);
    // console.log(req.body)
    await post_subject(req, res);
  }
);

router.get("/:id", async (req, res) => await get_subject(req, res));

router.put(
  "/:id",
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    if (req.files.length !== undefined) {
      req.body.cover = req.files["cover"][0].filename;
    }
    await update_subject(req, res);
  }
);

export default router;
