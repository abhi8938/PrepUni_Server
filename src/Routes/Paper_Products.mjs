//*Controller
import {
  download_file,
  get_paper_product,
  get_paper_products,
  post_paper_products,
  update_paper_products,
} from "../Controllers/paper_products.mjs";

import admin from "../Middlewares/admin.mjs";
import auth from "../Middlewares/auth.mjs";
import express from "express";
// import fileUpload from "../Middlewares/fileUpload.mjs";
import multer from "multer";

const router = express.Router();
let upload = multer({ dest: "uploads/" });

router.get(
  "/",
  [auth, admin],
  async (req, res) => await get_paper_products(req, res)
);

router.post(
  "/",
  [
    auth,
    admin,
    upload.fields([
      { name: "cover", maxCount: 1 },
      { name: "link", maxCount: 1 },
    ]),
  ],
  async (req, res) => {
    (req.body.link = req.files["link"][0].filename),
      (req.body.cover = req.files["cover"][0].filename);
    await post_paper_products(req, res);
  }
);

router.put(
  "/:id",
  [
    auth,
    admin,
    upload.fields([
      { name: "cover", maxCount: 1 },
      { name: "link", maxCount: 1 },
    ]),
  ],
  async (req, res) => {
    if (req.files["link"]) req.body.link = req.files["link"][0].filename;
    if (req.files["cover"]) req.body.cover = req.files["cover"][0].filename;
    await update_paper_products(req, res);
  }
);

router.get("/:id", auth, async (req, res) => await get_paper_product(req, res));
router.get("/files/:name", async (req, res) => await download_file(req, res));

export default router;
