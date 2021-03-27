//*Controller
import {
  cancel_payment,
  get_payment,
  post_payment,
  update_payment,
} from "../Controllers/Payments.mjs";

import express from "express";
import auth from "../Middlewares/auth.mjs"

const router = express.Router();

router.get("/",auth, async (req, res) => await get_payment(req, res));

router.post("/",auth, async (req, res) => await post_payment(req, res));

router.put("/:id",auth, async (req, res) => await update_payment(req, res));

router.post("/cancel",auth, async (req, res) => await cancel_payment(req, res));

export default router;
