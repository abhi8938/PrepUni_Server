import { DUR, JoiDUR } from "../Validators/common.mjs";

import Joi from "joi";
import mongoose from "mongoose";

//TODO:Create BMESSAGE
//* title - string
//* body - string
//* actions - [String]
//* CA

export const BMessage = mongoose.model(
  "BMessage",
  new mongoose.Schema({
    tittle: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    body: {
      type: String,
      required,
    },
    actions: [String],
    created_At: {
      type: Date,
      default: Date.now,
    },
  })
);

export const ValidateBMessage = (bmessage) => {
  //TODO:Create Schema
  const schema = {
    title: Joi.string().min(2).max(30).required(),
    body: Joi.string().min(10).max(1000).required(),
    actions: Joi.array().required(),
  };

  return Joi.validate(bmessage, schema);
};

//TODO: Create COURSE
//* name - string
//* subjects - [string]
//* total_semesters - number
//* cover
//* CA
//* LU
//* DUR

export const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    subjects: [String],
    total_semesters: {
      type: Number,
      required,
    },
    cover: {
      type: String,
      required,
    },
    created_At: {
      type: Date,
      default: Date.now,
    },
    last_update: {
      type: Date,
      required,
    },
    DUR: DUR,
  })
);

export const ValidateCourse = (course) => {
  const schema = {
    name: Joi.string().min(2).max(30).required(),
    subjects: Joi.array().required(),
    total_semesters: Joi.number().required(),
    cover: Joi.string().required(),
    DUR: Joi.object().required(),
  };

  return Joi.validate(course, schema);
};

//TODO:Create LEGAL Schema
//* tandc - [string],
//* about - [string],
//* privacy - [string],
//* CA
//* LU
//* DUR
export const Legal = mongoose.model(
  "Legal",
  new mongoose.Schema({
    tandc: [{ type: String, required }],
    about: [{ type: String, required }],
    privacy: [{ type: String, required }],
    created_At: {
      type: Date,
      defaul: Date.now,
    },
    last_update: {
      type: Date,
      required,
    },
    DUR: DUR,
  })
);

export const ValidateLegal = (legal) => {
  //TODO:Create Schema
  const schema = {
    tandc: Joi.array().required(),
    about: Joi.array().required(),
    privacy: Joi.array().required(),
    DUR: Joi.object().required(),
  };

  return Joi.validate(legal, schema);
};
