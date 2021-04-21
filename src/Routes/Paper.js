const {
  get_paper,
  get_papers,
  post_paper,
  update_paper,
  download_file
} =require("../Controllers/Paper");

const admin=require("../Middlewares/admin")
const auth=require("../Middlewares/auth")
const expres=require("express")
const multer=require('multer')

const router = expres.Router();
let upload = multer({ dest: "uploads/" });

router.get("/all/:id", async (req, res) => await get_papers(req, res));

router.get("/all",async (req,res) => await get_papers(req,res));

router.get("/single/:id", async (req, res) => await get_paper(req, res));

router.post(
  "/",
  upload.fields([{ name: "link", maxCount: 1 }]),
  async (req, res) => {
    req.body.link = req.files["link"][0].filename;
    await post_paper(req, res);
  }
);

router.put(
  "/:id",
  upload.fields([{ name: "link", maxCount: 1 }]),
  async (req, res) => {
    if (req.files.length !== undefined) {
      req.body.link = req.files["link"][0].filename;
    }
    await update_paper(req, res);
  }
);

router.get("/files/:name", async (req, res) => await download_file(req, res));

module.exports = router
