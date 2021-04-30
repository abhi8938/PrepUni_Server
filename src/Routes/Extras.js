//*Controller
const {
  get_bmessage,
  get_legal,
  post_bmessage,
  post_code,
  post_legal,
  post_mail,
  post_sms,
  update_bmessage,
  update_legal,
  get_faq,
  post_faq,
  update_faq,
} = require("../Controllers/extras");

const admin = require("../Middlewares/admin");
const auth = require("../Middlewares/auth");
const express = require("express");
const multer = require("multer");

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
  [auth],
  async (req, res) => await get_bmessage(req, res)
);

router.post(
  "/bmessage",
  [auth, admin],
  async (req, res) => await post_bmessage(req, res)
);

// router.put(
//   "/bmessage/:id",
//   [auth, admin],
//   async (req, res) => await update_bmessage(req, res)
// );

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

router.get("/faqs", auth, async (req, res) => await get_faq(req, res));

router.post("/faqs", [auth], async (req, res) => await post_faq(req, res));

router.put("/faqs/:id", [auth], async (req, res) => await update_faq(req, res));

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

module.exports = router;

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
