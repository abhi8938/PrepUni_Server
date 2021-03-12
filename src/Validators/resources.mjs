import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const Resources = mongoose.model(
  "Resources",
  new mongoose.Schema({
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    PPID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    datesheet: [
      {
        subject: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    center: {
      college: {
        type: String,
      },
      address: {
        address: {
          type: String,
        },
        lat: {
          type: Number,
        },
        long: {
          type: Number,
        },
      },
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
    DUR: DUR,
  })
);

export const Validate = (annotations) => {
  const schema = {
    datesheet: Joi.array().items(Joi.object()).required(),
    marksheet: Joi.array().items(Joi.object()).required(),
    center: Joi.object().required(),
    reminder: Joi.array().items(Joi.object()),
  };

  return Joi.validate(annotations, schema);
};

export const ValidateUpdate = (annotations) => {
  //TODO:Create Schema
  const schema = {
    datesheet: Joi.array().items(Joi.object()),
    marksheet: Joi.array().items(Joi.object()),
    center: Joi.object(),
    reminder: Joi.array().items(Joi.object()),
  };

  return Joi.validate(annotations, schema);
};
