import { DUR } from "../Validators/common.mjs";
import Joi from "joi";
import mongoose from "mongoose";

//TODO:Create Schema
// PID - Package Id - refernce Id
// STID - Student Id - reference Id
// PPID - Paper_product Id - [refernce Id]
// Type - TRIAL , PAID
// PAID - Payment Id - reference
// expiration - Date
// status - enum - ACTIVE / INACTIVE
// created_at - document genration time
// last_updated - last document updated time

// DUR - Document updates record - ED
//     - key
//     - prev
//     - current
//     - last_updated

export const Subscription = mongoose.model(
  "Subscription",
  new mongoose.Schema({
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
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
    Type: {
      type: String,
      required: true,
    },
    PA_ID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
      default: Date.now,
      expires: "219000m",
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    last_updated: {
      type: Date,
      required: true,
    },
    DUR: DUR,
  })
);

export const validate = (subscription) => {
  const schema = {
    //TODO:Create Schema
    PID: Joi.string().required(),
    PPIDS: Joi.array().items(Joi.string()),
    Type: Joi.string(),
    PA_ID: Joi.string(),
    status: Joi.string(),
  };

  return Joi.validate(subscription, schema);
};

export const validateUpdate = (subscription) => {
  const schema = {
    //TODO:Create Schema
    PID: Joi.string().required(),
  };

  return Joi.validate(subscription, schema);
};
