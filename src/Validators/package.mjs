import Joi from "joi";
import mongoose from "mongoose";

//TODO:Create Schema
//* features - Array of string
//* price - number
//* expiration - date 5 months after the creation of subscription
//* STID - student id - object reference
//* discount - number - greater than 0 less than 100
//* type - TRIAL / PAID
//* created_at
//* last_updated
//* DUR -

export const Package = mongoose.model(
  "Packages",
  new mongoose.Schema({
    type: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    features: {
      type: [String],
      required: true,
      minlength: 3,
    },
    price: {
      type: number,
      required: true,
      minlength: 3,
    },
    expiration: {
      type: Date,
      required: true,
      default: Date.now,
      expires: "219000m",
    },
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    type: {
      type: String,
      required: true,
      enum: ["TRIAL", "PAID"],
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

export const validate = (_package) => {
  //TODO:Create Schema
  const schema = {
    type: Joi.string().min(2).max(30).required(),
  };

  return Joi.validate(_package, schema);
};
