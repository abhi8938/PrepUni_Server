import Joi from "joi";
import mongoose from "mongoose";

//TODO:Create Schema
// last_name
// email
// phone

export const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
    },
    contact: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    display_name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    device_token: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
      minlength: 3,
    },
    college: {
      type: String,
      required: true,
      minlength: 3,
    },
    semester: {
      type: Number,
      required: true,
    },
    university: {
      type: String,
      required: true,
      minlength: 3,
    },
    type: {
      type: String,
      enum: ["STU"],
    },
    status:{
      type:String,
      enum:['ACTIVE','INACTIVE'],
      default:"ACTIVE"
    }
  })
);

export const validate = (student) => {
  //TODO:Create Schema
  const schema=Joi.object( {
    salutation: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().valid("MALE", "FEMALE"),
    contact: Joi.number().required().min(10).max(10),
    display_name: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).max(255).required(),
    device_token: Joi.string(),
    course: Joi.string(),
    college: Joi.string().required(),
    semester: Joi.number(),
    university: Joi.string().required(),
    type: Joi.string().valid("STU"),
  });

  return schema.validate(student);
};

export const validateUpdate = (student) => {
  //TODO:Create Schema
  const schema=Joi.object( {
    contact: Joi.number().required().min(10).max(10),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).max(255).required(),
    device_token: Joi.string(),
    semester: Joi.number(),
  });

  return schema.validate(student);
};
