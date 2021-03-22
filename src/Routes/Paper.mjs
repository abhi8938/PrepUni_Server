import {
    post_paper,
    get_papers,
    get_paper
} from "../Controllers/Paper.mjs"

import expres from "express";
import multer from "multer";

const router=expres.Router()
let upload=multer({dest:"uploads/"})

router.get('/',async(req,res)=>await get_papers(req,res))

router.get("/:id",async(req,res)=>await get_paper(req,res))

router.post('/',
    upload.fields([
        {name:"link",maxCount:1}
    ]),
    async(req,res)=>{
        req.body.link=req.files['link'][0].filename
        await post_paper(req,res)
    }
    )

// router.put('/:id',)

export default router;