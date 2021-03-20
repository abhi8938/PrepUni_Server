import Joi from "joi"
import mongoose from "mongoose";

export const Program=mongoose.model('program',
    new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true
        },
        university_ID:{
            type: mongoose.Schema.ObjectId,
            required:true
        },
        semester:{
            type:String,
            required:true
        }
    })    
)

export const validate=(course)=>{
    const schema=Joi.object({
    name:Joi.string().required(),
    university_ID:Joi.string().required(),
    semester:Joi.string().required()
    });

    return schema.validate(course)
};

export const validateUpdate=(course)=>{
    const schema=Joi.object({
        name:Joi.string(),
        university_ID:Joi.string(),
        semester:Joi.string()
    })

    return schema.validate(course)
}