import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

export const Subscript = mongoose.model(
  "subscription",
  new mongoose.Schema(
    {
      STID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        unique: true,
      },
      PID: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      program_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
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
      DUR: [DUR],
    },
    {
      timestamps: true,
    }
  )
);

export const validate = (subscription) => {
  const schema = Joi.object({
    PID: Joi.string().required(),
    program_id: Joi.string(),
    type: Joi.string(),
    PA_ID: Joi.string(),
    status: Joi.string(),
  });

  return schema.validate(subscription);
};

export const validateUpdate = (subscription) => {
  const schema = Joi.object({
    status: Joi.string().valid("ACTIVE", "INACTIVE"),
    subjects: Joi.array().items(Joi.string()),
     PA_ID: Joi.string(),
  });

  return schema.validate(subscription);
};
