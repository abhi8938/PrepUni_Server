const {
    post_syllabus,
    get_syllabuss,
    get_syllabus,
    update_syllabus
} =require("../Controllers/Syllabus")

const express=require("express")

const router=express.Router();

router.post('/',async(req,res)=>await post_syllabus(req,res))

router.get('/',async(req,res)=>await get_syllabuss(req,res))

router.get('/:id',async(req,res)=>await get_syllabus(req,res))

router.put('/:id',async(req,res)=>await update_syllabus(req,res))

module.exports=router;