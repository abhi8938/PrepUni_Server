import { DUR } from "./common.mjs";
import Joi from "joi";
import config from "config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    unique: true,
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  device_token: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.ObjectId,
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
  specialization: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["STU"],
    default: "STU",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  isloggedin: {
    type: Boolean,
    default: true,
  },
  isAdmin: Boolean,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  last_update: {
    type: Date,
    default: Date.now(),
  },
  DUR: [DUR],
});

studentSchema.method("generateAuthToken", function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
});

export const Student = mongoose.model("Student", studentSchema);

export const validate = (student) => {
  //TODO:Create Schema
  const schema = Joi.object({
    salutation: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().valid("MALE", "FEMALE"),
    contact: Joi.number().required(),
    display_name: Joi.string().required(),
    dob: Joi.date().required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    device_token: Joi.string().required(),
    course: Joi.string().required(),
    college: Joi.string().required(),
    semester: Joi.number().required(),
    university: Joi.string().required(),
    specialization: Joi.string().required(),
    type: Joi.string().valid("STU"),
  });

  return schema.validate(student);
};

export const validateUpdate = (student) => {
  const schema = Joi.object({
    contact: Joi.number(),
    email: Joi.string().min(5).email(),
    password: Joi.string().min(5).max(1024),
    device_token: Joi.string(),
    semester: Joi.number(),
  });

  return schema.validate(student);
};

export const validateAuth = (student) => {
  const schema = Joi.object({
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(student);
};
