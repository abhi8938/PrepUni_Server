import {
    post_universtiy,
    update_university,
    get_universities,
    get_university
} from "../Controllers/University.mjs";

import auth from "../Middlewares/auth.mjs";
import express from "express";

const router =express.Router()

router.get('/',async(req,res)=>await get_universities(req,res))

router.post('/',
    // auth,
    async(req,res)=> await post_universtiy(req,res)
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