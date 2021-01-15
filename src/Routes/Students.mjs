//*Controller
import {
  get_students,
  post_student,
  update_student,
} from "../Controllers/students.mjs";

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => await get_students(req, res));

router.post("/", async (req, res) => await post_student(req, res));

router.put("/:id", async (req, res) => await update_student(req, res));

export default router;
