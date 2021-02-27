import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const Package = mongoose.model(
  "Packages",
  new mongoose.Schema({
    type: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    features: {
      type: [String],
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
      minlength: 3,
    },
    life: {
      type: Date,
      required: true,
      default: Date.now,
      expires: "219000m",
    },
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    type: {
      type: String,
      required: true,
      enum: ["TRIAL", "PAID"],
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    last_updated: {
      type: Date,
      required: true,
    },
    DUR: DUR,
  })
);

export const validate = (_package) => {
  //TODO:Create Schema
  const schema = {
    type: Joi.string().min(2).max(30).required(),
    life: Joi.date().required(),
    price: Joi.number().required(),
    features: Joi.array().items(Joi.string()).required(),
    discount: Joi.number(),
  };

  return Joi.validate(_package, schema);
};

export const validateUpdate = (_package) => {
  //TODO:Create Schema
  const schema = {
    type: Joi.string().min(2).max(30),
    life: Joi.date(),
    price: Joi.number(),
    features: Joi.array().items(Joi.string()),
    discount: Joi.number(),
  };

  return Joi.validate(_package, schema);
};
