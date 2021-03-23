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
    order_id: {
      type: String,
    },
    amount: {
      type: String,
      required: true,
    },
    SID: {
      type: mongoose.Schema.ObjectId
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAIL", "PENDING","CREATED"],
      default:"CREATED"
    },
  },{
    timestamps:true
  })
);

export const validate = (payment) => {
  //TODO:Create Schema
  const schema = Joi.object({
    type: Joi.string().min(2).max(30).required(),
    amount: Joi.string().required(),
    STID:Joi.string().required(),
    SID:Joi.string()
  });

  return schema.validate(payment);
};
