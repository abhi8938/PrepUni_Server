//*Controller
import {
  get_session_report,
  post_session_report,
} from "../Controllers/session_report.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";

const router = express.Router();

router.get("/", auth, async (req, res) => await get_session_report(req, res));

router.post("/", auth, async (req, res) => await post_session_report(req, res));

export default router;
