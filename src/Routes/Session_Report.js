//*Controller
const {
  get_session_report,
  post_session_report,
} =require("../Controllers/session_report");

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.get("/", auth, async (req, res) => await get_session_report(req, res));

router.post("/", auth, async (req, res) => await post_session_report(req, res));

module.exports=router