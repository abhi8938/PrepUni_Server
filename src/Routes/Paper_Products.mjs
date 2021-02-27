//*Controller
import {
  get_paper_product,
  get_paper_products,
  post_paper_products,
  update_paper_products,
} from "../Controllers/paper_products.mjs";

import express from "express";
import fileUpload from "../Middlewares/fileUpload.mjs";

const router = express.Router();

router.get("/", async (req, res) => await get_paper_products(req, res));

router.post(
  "/",
  fileUpload,
  async (req, res) => await post_paper_products(req, res)
);

router.put("/:id", async (req, res) => await update_paper_products(req, res));

router.get(
  "/:id",
  fileUpload,
  async (req, res) => await get_paper_product(req, res)
);

export default router;
