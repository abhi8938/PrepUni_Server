import {
    get_universities,
    get_university,
    post_universtiy,
    update_university
} from "../Controllers/University.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";
import multer from "multer";

let upload = multer({ dest: "uploads/" });
const router =express.Router()

router.get('/',async(req,res)=>await get_universities(req,res))

router.post('/',
      upload.fields([
      { name: "logo", maxCount: 1 },
    ]),
    async(req,res)=> {
          req.body.logo = req.files['logo'][0].filename
        console.log('req.body',req.body);
        await post_universtiy(req,res)
    }
);

router.put(
    "/:id",
    // auth,
    async(req,res)=>await update_university(req,res)
)

router.get(
    "/:id",
    // auth,
    async(req,res)=>await get_university(req,res)
)

export default router;