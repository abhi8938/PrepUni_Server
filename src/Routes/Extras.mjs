//*Controller
import {
  get_bmessage,
  get_courses,
  get_legals,
  post_bmessage,
  post_course,
  post_legal,
  update_bmessage,
  update_course,
  update_legal,
} from "../Controllers/extras.mjs";

import express from "express";

const router = express.Router();

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* BMESSAGES

router.get("/bmessage", async (req, res) => await get_bmessage(req, res));

router.post("/bmessage", async (req, res) => await post_bmessage(req, res));

router.put(
  "/bmessage/:id",
  async (req, res) => await update_bmessage(req, res)
);

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Courses

router.get("/courses", async (req, res) => await get_courses(req, res));

router.post("/courses", async (req, res) => await post_course(req, res));

router.put("/courses/:id", async (req, res) => await update_course(req, res));

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */

//* Legals

router.get("/legals", async (req, res) => await get_legals(req, res));

router.post("/legals", async (req, res) => await post_legal(req, res));

router.put("/legals/:id", async (req, res) => await update_legal(req, res));

export default router;
