const {
    get_universities,
    get_university,
    post_universtiy,
    update_university
} =require("../Controllers/University");

const express=require("express")
const multer=require('multer')

let upload = multer({ dest: "uploads/" });
const router =express.Router()

router.get('/',async(req,res)=>await get_universities(req,res))

router.post('/',
      upload.fields([
      { name: "logo", maxCount: 1 },
    ]),
    async(req,res)=> {
          req.body.logo = req.files['logo'][0].filename
        await post_universtiy(req,res)
    }
);

router.put(
    "/:id",
    upload.fields([
        { name: "logo", maxCount: 1 },
      ])
    ,
    async(req,res)=>{
        if(req.files.length!==undefined){
            req.body.logo = req.files['logo'][0].filename
        }
        await update_university(req,res)
    }
)

router.get(
    "/:id",
    // auth,
    async(req,res)=>await get_university(req,res)
)

module.exports=router;