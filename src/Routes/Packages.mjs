//*Controller
import {
  get_package,
  get_packages,
  post_package,
  update_package,
} from "../Controllers/packages.mjs";

import admin from "../Middlewares/admin.mjs";
import auth from "../Middlewares/auth.mjs";
import express from "express";

const router = express.Router();

router.get("/", auth, async (req, res) => await get_packages(req, res));

router.post(
  "/",
  [auth, admin],
  async (req, res) => await post_package(req, res)
);

router.put(
  "/:id",
  [auth, admin],
  async (req, res) => await update_package(req, res)
);

router.get("/:id", auth, async (req, res) => await get_package(req, res));

export default router;
