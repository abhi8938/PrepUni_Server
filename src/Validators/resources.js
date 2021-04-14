const DUR=require("../Validators/common")
const Joi=require('joi')
const mongoose=require('mongoose')

const Resources = mongoose.model(
  "Resources",
  new mongoose.Schema({
    STID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    PPID: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    datesheet: [
      {
        subject: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    center: {
      college: {
        type: String,
      },
      address: {
        address: {
          type: String,
        },
        lat: {
          type: Number,
        },
        long: {
          type: Number,
        },
      },
    },
    DUR: [DUR],
  },{
    timestamps:true
  })
);

const Validate = (annotations) => {
  const schema = Joi.object({
    PPID:Joi.string().required(),
    datesheet: Joi.array().items(Joi.object()).required(),
    center: Joi.object().required(),
    // reminder: Joi.array().items(Joi.object()),
  });

  return schema.validate(annotations);
};

const ValidateUpdate = (annotations) => {
  //TODO:Create Schema
  const schema = Joi.object({
    PPID:Joi.string(),
    datesheet: Joi.array().items(Joi.object()),
    center: Joi.object(),
    // reminder: Joi.array().items(Joi.object()),
  });

  return schema.validate(annotations);
};

module.exports={
  ValidateUpdate,
  Validate,
  Resources
}