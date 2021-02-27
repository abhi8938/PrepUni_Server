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
      enum: ["ONLINE", "CREDIT", "DEBIT", "UPI"],
      required: true,
    },
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    transactionID: {
      type: String,
    },
    amount: {
      type: String,
      required: true,
    },
    CA: {
      type: String,
      required: true,
    },
    SID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAIL", "PENDING"],
    },
  })
);

export const validate = (payment) => {
  //TODO:Create Schema
  const schema = {
    type: Joi.string().min(2).max(30).required(),
    amount: Joi.string().required(),
  };

  return Joi.validate(payment, schema);
};
