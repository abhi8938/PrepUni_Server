import {
  Students,
  validate,
  validateAuth,
  validateUpdate,
} from "../Validators/student.mjs";

import { Annotations } from "../Validators/annotations.mjs";
import { BMessage } from "../Validators/extra.mjs";
import { Paper_Product } from "../Validators/paper_product.mjs";
import { Subscription } from "../Validators/subscription.mjs";
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const get_students = async (req, res) => {
  //TODO: Complete Request
  const students = await Students.find().sort("name");
  res.send(students);
};

export const get_student = async (req, res) => {
  //TODO: Complete Request
  const student = await Students.findById(req.user._id).select("-password");
  if (!student)
    return res
      .status(404)
      .send(
        "The student with givern id in not present OR wrong student doc id"
      );
  res.send(student);
};

export const post_student = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let student = Students.findOne({ email: req.body.email });
  if (student)
    return res
      .status(400)
      .send("User with same email id already exists, try logging in.");

  student = new Students(req.body.data);
  const salt = await bcrypt.genSalt(13);
  student.password = await bcrypt.hash(student.password, salt);
  student = await student.save();
  const token = Students.generateAuthToken();
  return res
    .status(200)
    .header("x-auth-token", token)
    .send(_.omit(student, ["password"]));
};

export const update_student = async (req, res) => {
  //TODO: Complete Request
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const student = await Student.findByIdAndUpdate(req.user._id, req.body.data, {
    new: true,
  });

  if (!student)
    return res
      .status(404)
      .send("The Student with the given id is not available");

  res.send(_.omit(student, ["password"]));
};

export const authenticate = async (req, res) => {
  //TODO: Complete Request
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let student = await Students.find({ email: req.body.email });
  if (!student) return res.status(400).send("Invalid email");
  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password
  );
  if (!validPassword) return res.status(400).send("Invalid Password");
  const token = Students.generateAuthToken();
  res.send(token);
};

export const get_all = async (req, res) => {
  //TODO: get student id from req.headers.token
  const students = await Student.findById("id");
  const subscription = await Subscription.findOne({ STID: "id" });
  const papers = await Paper_Product.find({ STID: "id" });
  const annotations = await Annotations.find({ STID: "id" });
  const broadcast = await BMessage.find();
  res.status(200).send({
    students: _.omit(students, ["password"]),
    subscription,
    papers,
    broadcast,
  });
};
// export const delete_student = (req, res) => {
//TODO Request
// };
