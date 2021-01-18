import Joi from "joi";
import { DUR } from "../Validators/common.mjs";
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
    PID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    PPID: [
      {
        type: mongoose.Schema.ObjectId,
        required:true,
        minlength: 2,
        maxlength: 30,
      },
    ],
    Type: {
      type: String,
      required: true,
    },
    PAID: {
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
    STID: Joi.string().required(),
    PPID: Joi.string().required(),
    Type: Joi.string().required(),
    PAID: Joi.string().required(),
    status: Joi.string().required(),
  };

  return Joi.validate(subscription, schema);
};
