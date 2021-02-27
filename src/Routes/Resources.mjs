//*Controller
import {
  get_resource,
  post_resource,
  update_resource,
} from "../Controllers/Resources.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";

const router = express.Router();

router.get("/", auth, async (req, res) => await get_resource(sreq, res));

router.post("/", auth, async (req, res) => await post_resource(req, res));

router.put("/:id", auth, async (req, res) => await update_resource(req, res));

export default router;
