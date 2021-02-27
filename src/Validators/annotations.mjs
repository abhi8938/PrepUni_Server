import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

const annotationSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["HIGHLIGHT" | "BOOKMARK" | "UNDERLINE" | "EMPTY"],
    required: true,
  },
  pageCfi: {
    type: String,
    required: true,
  },
  location: { offsetX: Number, offsetY: Number },
  epubCfi: {
    type: String,
  },
  color: String,
  text: {
    type: String,
    required: true,
  },
  note: String,
});

export const Annotations = mongoose.model(
  "Annotations",
  new mongoose.Schema({
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    PPID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    ann: [annotationSchema],
    created_at: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    last_updated: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    DUR: DUR,
  })
);

const annValidationSchema = {
  type: Joi.string().required(),
  pageCfi: Joi.number().required(),
  location: {
    offsetX: Joi.number(),
    offsetY: Joi.number(),
  },
  epubCfi: Joi.string(),
  color: Joi.string(),
  text: Joi.string().required(),
  note: Joi.string(),
};

export const Validate = (annotations) => {
  //TODO:Create Schema
  const schema = {
    STID: Joi.string().required(),
    PPID: Joi.string().required(),
    ann: Joi.array().items(annValidationSchema).required(),
  };

  return Joi.validate(annotations, schema);
};

export const ValidateUpdate = (annotations) => {
  //TODO:Create Schema
  const schema = {
    STID: Joi.string().required(),
    PPID: Joi.string().required(),
    ann: Joi.array().items(annValidationSchema),
  };

  return Joi.validate(annotations, schema);
};
