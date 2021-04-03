import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";


const annotationSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["HIGHLIGHT" , "BOOKMARK" , "UNDERLINE" , "EMPTY"],
    required: true,
  },
  pageCfi: {
    type: String, //epubcfi(/6/14[chap05ref]!)
    required: true,
  },
  location: { offsetX: Number, offsetY: Number },
  epubCfi: {
    type: String, //"epubcfi(/6/14[chap05ref]!/4[body01]/10/2/1:3[2^[1^]])"
  },
  color: String,
  text: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: String,
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
    paper_id: {
      type: mongoose.Schema.ObjectId,
      required: true
    },
    ann: [annotationSchema],
    DUR: DUR,
  },{
    timestamps:true
  })
);

const annValidationSchema = {
  type: Joi.string().required(),
  pageCfi: Joi.string().required(),
  location: {
    offsetX: Joi.number(),
    offsetY: Joi.number(),
  },
  epubCfi: Joi.string(),
  color: Joi.string(),
  text: Joi.string().required(),
  note: Joi.string(),
  pageNumber:Joi.number()
};

const validate_DUR={
  key:Joi.string(),
  prev:Joi.string(),
  current:Joi.string()
}

export const Validate = (annotations) => {
  //TODO:Create Schema
  const schema = Joi.object({
    STID: Joi.string().required(),
    paper_id: Joi.string().required(),
    ann: Joi.array().items(annValidationSchema).required(),
    DUR:validate_DUR
  });

  return schema.validate(annotations)
};

export const ValidateUpdate = (annotations) => {
  //TODO:Create Schema
  const schema = Joi.object({
    STID: Joi.string().required(),
    paper_id: Joi.string().required(),
    ann: Joi.array().items(annValidationSchema),
    DUR:validate_DUR
  });

  return schema.validate(annotations)
};
