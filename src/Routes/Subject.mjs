import {
    post_subject,
    get_subjects,
    get_subject,
    update_subject
} from "../Controllers/Subject.mjs"
import auth from "../Middlewares/auth.mjs";
import express from "express";

const router=express.Router();

router.get('/',async(req,res)=>await get_subjects(req,res));

router.post('/',async(req,res)=>await post_subject(req,res));

router.get("/:id",async(req,res)=>await get_subject(req,res));

router.put("/:id",async(req,res)=>await update_subject(req,res));

export default router;