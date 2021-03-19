import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const BMessage = mongoose.model(
  "BMessage",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    body: {
      type: String,
      required: true,
    },
    actions: [String],
    created_At: {
      type: Date,
      default: Date.now(),
    },
  })
);

export const ValidateBMessage = (bmessage) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    body: Joi.string().min(10).max(1000).required(),
    actions: Joi.array().required(),
  });

  return schema.validate(bmessage);
};

const semester = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      total_marks: {
        type: Number,
        required: true,
      },
      chapters: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});

export const Program = mongoose.model(
  "Program",
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
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    created_At: {
      type: Date,
      default: Date.now(),
    },
    last_update: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    syllabus: [semester],
    university: {
      type: String,
      required: true,
    },
    keywords: [String],
    DUR: [DUR],
  })
);

export const ValidateProgram = (program) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    subjects: Joi.array().required(),
    total_semesters: Joi.number().required(),
    cover: Joi.string().required(),
    university: Joi.string().required(),
  });

  return schema.validate(program);
};

export const Legal = mongoose.model(
  "Legal",
  new mongoose.Schema({
    tandc: [{ type: String, required: true }],
    about: [{ type: String, required: true }],
    privacy: [{ type: String, required: true }],
    created_At: {
      type: Date,
      defaul: Date.now(),
    },
    last_update: {
      type: Date,
      default: Date.now(),
    },
    DUR: [DUR],
  })
);

export const ValidateLegal = (legal) => {
  const schema = Joi.object({
    tandc: Joi.array().required(),
    about: Joi.array().required(),
    privacy: Joi.array().required(),
  });

  return schema.validate(legal);
};

export const validateLegalUpdate = (legal) => {
  const schema = Joi.object({
    tandc: Joi.array(),
    about: Joi.array(),
    privacy: Joi.array(),
  });

  return schema.validate(legal);
};

export const University = mongoose.model(
  "University",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    colleges: [
      {
        name: {
          type: String,
          required: true,
        },
        keywords: [String],
      },
    ],
    logo: {
      type: String,
      required: true,
    },
    created_At: {
      type: Date,
      default: Date.now(),
    },
    last_update: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    keywords: [String],
    DUR: [DUR],
  })
);

export const validateUniversity = (program) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    colleges: Joi.array().required(),
    logo: Joi.string().required(),
  });

  return schema.validate(program);
};
