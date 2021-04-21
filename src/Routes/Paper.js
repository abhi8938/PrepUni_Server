const {
  get_paper,
  get_papers,
  post_paper,
  update_paper,
  download_file,
} = require("../Controllers/Paper");

const admin = require("../Middlewares/admin");
const auth = require("../Middlewares/auth");
const expres = require("express");
const multer = require("multer");

const router = expres.Router();
var storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    console.log("req", req, file.mimetype.split("/")[1]);
    const name = file.originalname.includes(" ")
      ? file.originalname.replace(/ /g, "_")
      : file.originalname;
    cb(null, name.includes(".") ? name : name + file.mimetype.split("/")[1]);
  },
});

router.get("/all/:id", async (req, res) => await get_papers(req, res));

router.get("/all",async (req,res) => await get_papers(req,res));

let upload = multer({ storage: storage });
 
router.get(
  "/single/:id",
  [auth, admin],
  async (req, res) => await get_paper(req, res)
);

router.post(
  "/",
  // [auth, admin],
  upload.fields([{ name: "link", maxCount: 1 }]),
  async (req, res) => {
    req.body.link = req.files["link"][0].filename;
    await post_paper(req, res);
  }
);

router.put(
  "/:id",
  [auth, admin],
  upload.fields([{ name: "link", maxCount: 1 }]),
  async (req, res) => {
    if (req.files.length !== undefined) {
      req.body.link = req.files["link"][0].filename;
    }
    await update_paper(req, res);
  }
);

router.get("/files/:name", async (req, res) => await download_file(req, res));

module.exports = router;
