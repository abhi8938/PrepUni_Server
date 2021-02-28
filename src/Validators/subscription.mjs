import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const Subscript = mongoose.model(
  "subscription",
  new mongoose.Schema({
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
    },
    PID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    PPIDS: [
      {
        type: mongoose.Schema.ObjectId,
        required: true,
        minlength: 2,
        maxlength: 30,
      },
    ],
    type: {
      type: String,
      required: true,
    },
    PA_ID: {
      type: mongoose.Schema.ObjectId,
    },
    expiration: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    last_updated: {
      type: Date,
      default: Date.now(),
    },
    DUR: [DUR],
  })
);

export const validate = (subscription) => {
  const schema = Joi.object({
    PID: Joi.string().required(),
    PPIDS: Joi.array().items(Joi.string()),
    type: Joi.string(),
    PA_ID: Joi.string(),
    status: Joi.string(),
  });

  return schema.validate(subscription);
};

export const validateUpdate = (subscription) => {
  const schema = Joi.object({
    status: Joi.string().valid("ACTIVE", "INACTIVE"),
  });

  return schema.validate(subscription);
};
