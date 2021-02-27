import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const Paper_Product = mongoose.model(
  "Paper_Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
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

export const validate = (paper_product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
    course: Joi.string().required(),
    semester: Joi.string().required(),
    subject: Joi.string().required(),
    cover: Joi.string().required(),
    university: Joi.string().required(),
  });

  return schema.validate(paper_product);
};

export const validateUpdate = (paper_product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    link: Joi.string(),
    cover: Joi.string(),
  });

  return schema.validate(paper_product);
};
