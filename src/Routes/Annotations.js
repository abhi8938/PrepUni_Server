//*Controller
const {
  get_annotation,
  get_annotations,
  post_annotations,
  update_annotations,
  check_doc
}=require("../Controllers/Annotations");

const auth=require("../Middlewares/auth")
const express=require("express")

const router = express.Router();

router.get("/", auth, async (req, res) => await get_annotations(req, res));

router.post("/", auth, async (req, res) => await post_annotations(req, res));

router.put(
  "/:id",
  auth,
  async (req, res) => await update_annotations(req, res)
);

router.get("/:id", auth, async (req, res) => await get_annotation(req, res));

router.get("/check/:id",auth,async(req,res)=>await check_doc(req,res))

module.exports=router;
