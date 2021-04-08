const{
    post_program,
    get_programs,
    get_program,
    update_program
} =require("../Controllers/Program");

const admin=require("../Middlewares/admin")
const auth=require("../Middlewares/auth")
const express=require("express")

const router=express.Router()

router.get('/',async(req,res)=>await get_programs(req,res));

router.post('/',async (req,res)=> await post_program(req,res));

router.get('/:id',async(req,res)=>await get_program(req,res));

router.put('/:id',async(req,res)=>await update_program(req,res))

module.exports=router