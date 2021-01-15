import Joi from "joi";
import mongoose from "mongoose";

//TODO:Create Schema
//* STID
//* TID
//* amount
//* type - ONLINE / CREDIT / DEBIT
//* CA
//* LU
//* SID - Subscription Id

export const Payment = mongoose.model(
  "Payments",
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
  })
);

export const validate = (payment) => {
  //TODO:Create Schema
  const schema = {
    type: Joi.string().min(2).max(30).required(),
  };

  return Joi.validate(payment, schema);
};
