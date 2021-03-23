import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

const features=new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["TRIAL", "PAID"]
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  features:[{
    feature:{
      type:String
    },
    active:{
      type:String,
      enum:['TRUE','FALSE']
    }
  }]
})

export const Pack = mongoose.model(
  "packs",
  new mongoose.Schema({
    features: features,
    life: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number
    },
    keywords: [String],
    DUR: [DUR]
  },{
    timestamps:true
  })
);

export const validate = (_package) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    life: Joi.date().required(),
    price: Joi.number().required(),
    features: Joi.array().items(Joi.string()).required(),
    discount: Joi.number(),
  });

  return schema.validate(_package);
};

export const validateUpdate = (_package) => {
  const schema = Joi.object({
    type: Joi.string(),
    life: Joi.date(),
    price: Joi.number(),
    features: Joi.array().items(Joi.string()),
    discount: Joi.number(),
  });

  return schema.validate(_package);
};
