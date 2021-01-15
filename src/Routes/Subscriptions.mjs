//*Controller
import {
  get_subscriptions,
  post_subscription,
  update_subscription,
} from "../Controllers/subscriptions.mjs";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => await get_subscriptions(req, res));

router.post("/", async (req, res) => await post_subscription(req, res));

router.put("/:id", async (req, res) => await update_subscription(req, res));

export default router;
