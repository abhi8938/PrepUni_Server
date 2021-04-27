const mongoose = require("mongoose");
const Joi = require("joi");
const DUR = require("./common");

const transactionSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["C", "D"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const referalSchema = new mongoose.Schema(
  {
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      default: 100,
    },
    transactions: [transactionSchema],
    DUR: [DUR],
  },
  {
    timestamps: true,
  }
);

const Referals = mongoose.model("Referals", referalSchema);

const validate = (referal) => {
  const schema = Joi.object({
    balance: Joi.number().required(),
    limit: Joi.number(),
    transactions: Joi.string(),
  });

  return schema.validate(referal);
};

const validateUpdate = (referal) => {
  const schema = Joi.object({
    balance: Joi.number(),
    limit: Joi.number(),
    transactions: Joi.string(),
  });

  return schema.validate(referal);
};

module.exports = {
  Referals,
  validate,
  validateUpdate,
};
