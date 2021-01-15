import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

//TODO:Create Schema
//* STID - ObjectId (for reference)
//* PPID - ObjectId (for reference)
//* bookmarks - [{
//*  chapter_name - string
//*  page_number - number
//*  data_location - number
//*  cfi - string
//*  created_at
//* }]

//* notes - [{
//*   chapter_name - string
//*   data - string
//*   page_number - number
//*   color - string
//*   data_location - string
//*   cfi - string
//*   created_at
//* }]

//* Highlights - [{
//*  chapter_name - string
//*  data - string
//*  page_number - number,
//*  color - string
//*  cfi - string
//*  data_location - string
//*  created_at
//* }]

//* created_at
//* last_updated
//* DUR

const bookmarkSchema = mongoose.Schema({
  chapter_name: {
    type: String,
    required,
  },
  page_number: {
    type: Number,
    required,
  },
  data_location: {
    type: String,
    required,
  },
  cfi: {
    type: String,
    required,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});

const notesSchema = mongoose.Schema({
  chapter_name: {
    type: String,
    required,
  },
  data: {
    type: String,
    required,
  },
  page_number: {
    type: Number,
    required,
  },
  color: {
    type: String,
    required,
  },
  data_location: {
    type: String,
    required,
  },
  cfi: {
    type: String,
    required,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});

const highlightsSchema = mongoose.Schema({
  chapter_name: {
    type: String,
    required,
  },
  data: {
    type: String,
    required,
  },
  page_number: {
    type: Number,
    required,
  },
  color: {
    type: String,
    required,
  },
  data_location: {
    type: String,
    required,
  },
  cfi: {
    type: String,
    required,
  },
  created_At: {
    type: Date,
    default: Date.now,
  },
});
export const Study_Material = mongoose.model(
  "Study_Material",
  new mongoose.Schema({
    STID: {
      type: mongoose.Schema.ObjectId,
      required,
    },
    PPID: {
      type: mongoose.Schema.ObjectId,
      required,
    },
    bookmarks: [bookmarkSchema],
    notes: [notesSchema],
    highlights: [highlightsSchema],
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    last_updated: {
      type: Date,
      required,
    },
    DUR: DUR,
  })
);

const bookmarkValidation = {
  chapter_name: Joi.string().required(),
  page_number: Joi.number().required(),
  data_location: Joi.string().required(),
  cfi: Joi.string().required(),
  created_at: Joi.string().required(),
};

const notesValidations = {
  chapter_name: Joi.string().min(3).required(),
  data: Joi.string().min(3).required(),
  page_number: Joi.number().required(),
  color: Joi.string().required(),
  data_location: Joi.string().required(),
  cfi: Joi.string().required(),
  created_at: Joi.string().required(),
};

const hightlightsValidations = {
  chapter_name: Joi.string().min(3).required(),
  data: Joi.string().min(3).required(),
  page_number: Joi.number().required(),
  color: Joi.string().required(),
  data_location: Joi.string().required(),
  cfi: Joi.string().required(),
  created_at: Joi.string().required(),
};

export const Validate = (study_material) => {
  //TODO:Create Schema
  const schema = {
    STID: Joi.string().required(),
    PPID: Joi.string().required(),
    bookmarks: Joi.array().items(bookmarkValidation),
    notes: Joi.array().items(notesValidation),
    hightlights: Joi.array().items(hightlightsValidation),
    // created_at: Joi.string().required(),
    // last_updated: Joi.string().required(),
  };

  return Joi.validate(study_material, schema);
};
