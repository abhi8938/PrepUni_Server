//*Controller
import {
  get_bmessage,
  get_legal,
  post_bmessage,
  post_code,
  post_legal,
  post_mail,
  post_sms,
  update_bmessage,
  update_legal,
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

//* Programs


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


