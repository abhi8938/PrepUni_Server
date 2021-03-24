import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

const features_schema=new mongoose.Schema({
  
  features:[{
    feature:{
      type:String
    },
    active:{
      type:Boolean
    }
  }]
})

export const Pack = mongoose.model(
  "packs",
  new mongoose.Schema({
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    features: [{
      feature:{
        type:String
      },
      active:{
        type:Boolean
      }
    }],
    life: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      min:0
    },
    type: {
      type: String,
      required: true,
      enum: ["TRIAL", "PAID"]
    },
    keywords: [String],
    DUR: [DUR]
  },{
    timestamps:true
  })
);

const validatefeature={
  // features:Joi.array().items({
    feature:Joi.string().required(),
    active:Joi.boolean().required()
  // })
}

export const validate = (_package) => {
  const schema = Joi.object({
    price:Joi.number().min(0).required(),
    features:Joi.array().items(validatefeature).required(),
    type: Joi.string().required(),
    life: Joi.date().required(),
    discount: Joi.number(),
  });

  return schema.validate(_package);
};

const updatevalidatefeature={
  // features:Joi.array().items({
    feature:Joi.string(),
    active:Joi.boolean()
  // })
}

export const validateUpdate = (_package) => {
  const schema = Joi.object({
    price:Joi.number().min(0),
    features:Joi.array().items(updatevalidatefeature),
    type: Joi.string(),
    life: Joi.date(),
    discount: Joi.number(),
  });

  return schema.validate(_package);
};
