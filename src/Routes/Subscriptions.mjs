//*Controller
import {
  get_subscription,
  get_subscriptions,
  post_subscription,
  update_subscription,
} from "../Controllers/subscriptions.mjs";

import admin from "../Middlewares/admin.mjs";
import auth from "../Middlewares/auth.mjs";
import express from "express";

const router = express.Router();

router.get(
  "/",
  [auth, admin],
  async (req, res) => await get_subscriptions(req, res)
);

router.post("/", auth, async (req, res) => await post_subscription(req, res));

router.put(
  "/:id",
  auth,
  async (req, res) => await update_subscription(req, res)
);

router.get("/me", auth, async (req, res) => await get_subscription(req, res));

export default router;
