import Joi from "joi";
import mongoose from "mongoose";

export const University=mongoose.model("university",
new mongoose.Schema({
    logo:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    }
},{
    timestamps:true
}))

export const validate=(university)=>{
    const schema=Joi.object({
        logo:Joi.string().required(),
        Name:Joi.string().required()
    })

    return schema.validate(university)
}

export const validateUpdate=(university)=>{
    const schema=Joi.object({
        logo:Joi.string(),
        Name:Joi.string()
    })

    return schema.validate(university)
}