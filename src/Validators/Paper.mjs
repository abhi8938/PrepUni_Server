import Joi from "joi";
import mongoose from "mongoose";

export const Paper=mongoose.model('paper',
    new mongoose.Schema({
        subject_id:{
            type:mongoose.Schema.ObjectId,
            required:true
        },
        link:{
            type:String,
            required:true
        },
        year:{
            type:Number,
            required:true
        }
    },{
        timestamps:true
    })
)

export const validate=(paper)=>{
    const schmea=Joi.object({
        subject_id:Joi.string().required(),
        link:Joi.string().required(),
        year:Joi.number().required()
    });

    return schmea.validate(paper)
}

export const validateUpdate=(paper)=>{
    const schmea=Joi.object({
        subject_id:Joi.string(),
        link:Joi.string(),
        year:Joi.number()
    });

    return schmea.validateUpdate(paper)
}