const DUR = require("../Validators/common");
const Joi = require("joi");
const mongoose = require("mongoose");

const BMessage = mongoose.model(
  "BMessage",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      body: {
        type: String,
        required: true,
      },
      actions: [String],
    },
    {
      timestamps: true,
    }
  )
);

const ValidateBMessage = (bmessage) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    body: Joi.string().min(10).max(1000).required(),
    actions: Joi.array().required(),
  });

  return schema.validate(bmessage);
};

const semester = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      total_marks: {
        type: Number,
        required: true,
      },
      chapters: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
});

const FAQ = mongoose.model(
  "faqs",
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      answer: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

const validateFAQ = (legal) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  });

  return schema.validate(legal);
};

const validateLegalUpdate = (legal) => {
  const schema = Joi.object({
    tandc: Joi.array(),
    about: Joi.array(),
    privacy: Joi.array(),
  });

  return schema.validate(legal);
};

module.exports = {
  validateLegalUpdate,
  validateFAQ,
  FAQ,
  ValidateBMessage,
  BMessage,
};
