import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const Pack = mongoose.model(
  "Packs",
  new mongoose.Schema({
    features: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    life: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["TRIAL", "PAID"],
      unique: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    last_update: {
      type: Date,
      default: Date.now(),
    },
    DUR: [DUR],
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
