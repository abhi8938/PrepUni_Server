const Joi=require('joi')
const mongoose=require('mongoose')

const University=mongoose.model("university",
new mongoose.Schema({
    logo:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
}))

const validate=(university)=>{
    const schema=Joi.object({
        logo:Joi.string().required(),
        name:Joi.string().required()
    })

    return schema.validate(university)
}

const validateUpdate=(university)=>{
    const schema=Joi.object({
        logo:Joi.string(),
        name:Joi.string()
    })

    return schema.validate(university)
}

module.exports={
    validateUpdate,
    validate,
    University
}