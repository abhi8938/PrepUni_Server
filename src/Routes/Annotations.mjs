//*Controller
import {
  get_annotation,
  get_annotations,
  post_annotations,
  update_annotations,
} from "../Controllers/Annotations.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";

const router = express.Router();

router.get("/", auth, async (req, res) => await get_annotations(req, res));

router.post("/", auth, async (req, res) => await post_annotations(req, res));

router.put(
  "/:id",
  auth,
  async (req, res) => await update_annotations(req, res)
);

router.put("/me", auth, async (req, res) => await get_annotation(req, res));

export default router;
