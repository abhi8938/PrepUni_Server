//*Controller
const {
  get_resource,
  post_resource,
  update_resource,
} = require("../Controllers/Resources");

const admin = require("../Middlewares/admin");
const auth = require("../Middlewares/auth");
const express = require("express");

const router = express.Router();

router.get("/", auth, async (req, res) => await get_resource(req, res));

router.post("/", async (req, res) => await post_resource(req, res));

router.put("/:id", auth, async (req, res) => await update_resource(req, res));

module.exports = router;
