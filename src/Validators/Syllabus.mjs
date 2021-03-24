import Joi from "joi";
import mongoose from "mongoose";

export const Syllabus=mongoose.model(
    'syllabus',
    new mongoose.Schema({
        subject_id:{
            type:mongoose.Schema.ObjectId,
            required:true
        },
        units:[String]
    },{
        timestamps:true
    })
)

export const validate=(syllabus)=>{
    const schema=Joi.object({
        subject_id:Joi.string().required(),
        units:Joi.array().required()
    })

    return schema.validate(syllabus)
}


export const updatevalidate=(syllabus)=>{
    const schema=Joi.object({
        subject_id:Joi.string(),
        units:Joi.array()
    })

    return schema.validate(syllabus)
}