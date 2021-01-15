//*Controller
import {
  get_study_material,
  post_study_material,
  update_study_material,
} from "../Controllers/study_materials";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => await get_study_material(req, res));

router.post("/", async (req, res) => await post_study_material(req, res));

router.put("/:id", async (req, res) => await update_study_material(req, res));

export default router;
