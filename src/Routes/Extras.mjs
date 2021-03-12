//*Controller
import {
  get_bmessage,
  get_course,
  get_courses,
  get_legal,
  get_universities,
  get_university,
  post_bmessage,
  post_code,
  post_course,
  post_legal,
  post_mail,
  post_sms,
  post_university,
  update_bmessage,
  update_course,
  update_legal,
  update_university,
} from "../Controllers/extras.mjs";

import admin from "../Middlewares/admin.mjs";
import auth from "../Middlewares/auth.mjs";
import express from "express";
import fileUpload from "../Middlewares/fileUpload.mjs";
import multer from "multer";

const router = express.Router();
let upload = multer({ dest: "uploads/" });

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* BMESSAGES

router.get(
  "/bmessage",
  [auth, admin],
  async (req, res) => await get_bmessage(req, res)
);

router.post(
  "/bmessage",
  [auth, admin],
  async (req, res) => await post_bmessage(req, res)
);

router.put(
  "/bmessage/:id",
  [auth, admin],
  async (req, res) => await update_bmessage(req, res)
);

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Courses

router.get("/courses", async (req, res) => await get_courses(req, res));

router.post("/courses", upload.single("cover"), async (req, res) => {
  req.body.subjects = JSON.parse(req.body.subjects);
  req.body.cover = req.file.filename;
  await post_course(req, res);
});

router.put("/courses/:id", upload.single("cover"), async (req, res) => {
  req.body.cover = req.file.filename;
  await update_course(req, res);
});

router.get("/courses/:id", async (req, res) => await get_course(req, res));

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Legals

router.get("/legals/:id", auth, async (req, res) => await get_legal(req, res));

router.post(
  "/legals",
  [auth, admin],
  async (req, res) => await post_legal(req, res)
);

router.put(
  "/legals/:id",
  [auth, admin],
  async (req, res) => await update_legal(req, res)
);

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* SendMail / sendMessage
router.post("/sendCode", async (req, res) => await post_code(req, res));
router.post("/sendSMS", async (req, res) => await post_sms(req, res));
router.post("/sendMail", auth, async (req, res) => await post_mail(req, res));

export default router;

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* University

router.get("/university", async (req, res) => await get_universities(req, res));

router.post("/university", upload.single("logo"), async (req, res) => {
  req.body.logo = req.file.filename;
  await post_university(req, res);
});

router.put("/university/:id", upload.single("logo"), async (req, res) => {
  req.body.logo = req.file.filename;
  await update_university(req, res);
});

router.get(
  "/university/:id",
  async (req, res) => await get_university(req, res)
);
