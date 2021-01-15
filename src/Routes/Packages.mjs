//*Controller
import {
  get_packages,
  post_package,
  update_package,
} from "../Controllers/packages.mjs";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => await get_packages(req, res));

router.post("/", async (req, res) => await post_package(req, res));

router.put("/:id", async (req, res) => await update_package(req, res));

export default router;
