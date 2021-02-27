//*Controller
import {
  cancel_payment,
  get_payment,
  post_payment,
  update_payment,
} from "../Controllers/Payments.mjs";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => await get_payment(req, res));

router.post("/", async (req, res) => await post_payment(req, res));

router.put("/:id", async (req, res) => await update_payment(req, res));

router.post("/cancel", async (req, res) => await cancel_payment(req, res));

export default router;
