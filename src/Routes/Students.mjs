//*Controller
import {
  authenticate,
  get_all,
  get_student,
  get_students,
  post_student,
  reset_password,
  update_student,
  logoutfromdevice
} from "../Controllers/students.mjs";

import admin from "../Middlewares/admin.mjs";
import auth from "../Middlewares/auth.mjs";
import {checkLogin} from "../Middlewares/checkLogin.mjs";
import express from "express";

const router = express.Router();

router.put("/reset", async (req, res) => await reset_password(req, res));

router.get("/", async (req, res) => await get_students(req, res));

router.post("/", async (req, res) => await post_student(req, res));

router.put("/", auth, async (req, res) => await update_student(req, res));
router.get("/me", auth, async (req, res) => await get_student(req, res));

router.get("/all", auth, async (req, res) => await get_all(req, res));

router.post(
  "/authenticate",
  checkLogin,
  async (req, res) => await authenticate(req, res)
);

router.post(
  "/logout",
  auth,
  logoutfromdevice
)

export default router;
