import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";
//TODO:Create Schema
//* name
//* link
//* course
//* semester - Number
//* subject
//* created_at
//* last_updated
//* DUR
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
      required,
    },
    course: {
      type: String,
      required,
    },
    semester: {
      type: Number,
      required,
    },
    subject: {
      type: String,
      required,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    last_updated: {
      type: Date,
      required,
    },
    DUR: DUR,
  })
);

export const validate = (paper_product) => {
  //TODO:Create Schema
  const schema = {
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
    course: Joi.string().required(),
    semester: Joi.string().required(),
    subject: Joi.string().required(),
    DUR: Joi.oobject.required(),
  };

  return Joi.validate(paper_product, schema);
};
