const Joi = require("joi");
const mongoose = require("mongoose");

const DUR = mongoose.Schema(
  {
    key: {
      type: String,
    },
    prev: {
      type: String,
      // required: true,
    },
    current: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = DUR;
