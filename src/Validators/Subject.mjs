import Joi from "joi";
import mongoose from "mongoose";

export const Subject = mongoose.model(
  "subject",
  new mongoose.Schema(
    {
      cover: {
        type: String,
      },
      semester: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      by: {
        type: String,
        required: true,
      },
      maximum_marks: {
        type: Number,
      },
      program_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export const validate = (program) => {
  const schema = Joi.object({
    cover: Joi.string().required(),
    semester: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    by: Joi.string().required(),
    maximum_marks: Joi.number(),
    program_id: Joi.string().required(),
  });

  return schema.validate(program);
};

export const validateUpdate = (program) => {
  const schema = Joi.object({
    cover: Joi.string(),
    semester: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    by: Joi.string(),
    maximum_marks: Joi.number(),
    program_id: Joi.string(),
  });

  return schema.validate(program);
};
