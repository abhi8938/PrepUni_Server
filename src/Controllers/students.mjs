import {
  Student,
  validate,
  validateAuth,
  validateUpdate,
} from "../Validators/student.mjs";
import { generateKeywords, handleUpdate } from "../Services/algo.mjs";

import { Annotations } from "../Validators/annotations.mjs";
import { BMessage } from "../Validators/extra.mjs";
import { Paper } from "../Validators/Paper.mjs";
import { Program } from "../Validators/Program.mjs";
import { Subject } from "../Validators/Subject.mjs";
import { Subscript } from "../Validators/subscription.mjs";
import { Syllabus } from "../Validators/Syllabus.mjs";
import { University } from "../Validators/University.mjs";
import _ from "lodash";
import bcrypt from "bcrypt";

export const get_students = async (req, res) => {
  const students = await Student.find().sort("first_name");
  res.status(200).send(students);
};

export const get_student = async (req, res) => {
  let student = await Student.findById(req.user._id).select("-password");
  if (!student)
    throw new Error(
      "The student with givern id in not present OR wrong student doc id"
    );
  var university_name=await University.findById(student['university'])
  var university_data={
    _id:student['university'],
    name:university_name['name']
  }
  student.university=JSON.stringify(university_data)

  var program_name=await Program.findById(student['program'])
  console.log(program_name)
  var program_data={
    _id:student['program'],
    name:program_name['name']
  }
  student.program=JSON.stringify(program_data)

  res.status(200).send(student);
};

export const post_student = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);
  let email_student = await Student.findOne({
    email: req.body.email,
  });
  let contact_student;
  if (req.body.contact) {
    contact_student = await Student.findOne({
      contact: req.body.contact,
    });
  }
  let userID_student = await Student.findOne({
    user_name: req.body.user_name,
  });
  console.log("student", email_student, contact_student, userID_student);
  if (email_student || contact_student || userID_student)
    throw new Error(
      "User with same email or contact or userID already exists, try logging in."
    );

  let student = new Student(req.body);
  const salt = await bcrypt.genSalt(13);
  student.password = await bcrypt.hash(student.password, salt);
  let keywords = generateKeywords(
    `${req.body.first_name} ${req.body.last_name}`
  )
    .concat(generateKeywords(req.body.contact))
    .concat(generateKeywords(req.body.email));
  student.keywords = keywords;
  student = await student.save();
  const token = student.generateAuthToken();
  return res
    .status(200)
    .header("x-auth-token", token)
    .send(_.omit(student, ["password"]));
};

export const update_student = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);
  let student = await Student.findById(req.user._id);
  if (!student)
    throw new Error("The Student with the given id is not available");
  handleUpdate(student, req.body);
  student = await student.save();
  // if (req.body.semester)
  //   res.status(201).send(`http://127.0. 0.1:3001/ccavRequestHandler`);
  res.status(200).send(_.omit(student, ["password"]));
};

export const reset_password = async (req, res) => {
  console.log("req.body", req.body);
  if (!req.body.password) throw new Error("NO Password sent");
  if (!req.body.id) throw new Error("NO Recipent");
  let student;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.id)) {
    student = await Student.findOne({ email: req.body.id });
    if (!student) throw new Error("Invalid Email");
  } else if (/^\d{10}$/.test(req.body.id)) {
    student = await Student.findOne({ contact: req.body.id });
    if (!student) throw new Error("Invalid Phone number");
  }
  const salt = await bcrypt.genSalt(13);
  student.password = await bcrypt.hash(req.body.password, salt);
  student = await student.save();
  res.status(200).send("Password Updated");
};

export const authenticate = async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) throw new Error(error.details[0].message);
  let student;
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.id)) {
    student = await Student.findOne({ email: req.body.id });
    if (!student) throw new Error("Invalid Email");
  } else if (/^\d{10}$/.test(req.body.id)) {
    student = await Student.findOne({ contact: req.body.id });
    if (!student) throw new Error("Invalid Phone number");
  } else {
    student = await Student.findOne({ user_name: req.body.id });
    if (!student) throw new Error("Invalid User name");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    student.password
  );
  if (!validPassword) throw new Error("Invalid Password");
  const token = student.generateAuthToken();
  res.status(200).send(token);
};

export const get_all = async (req, res) => {
  //TODO: get student id from req.headers.token
  const students = await Student.findById("id");
  const subscription = await Subscription.findOne({ STID: "id" });

  const annotations = await Annotations.find({ STID: "id" });
  const broadcast = await BMessage.find();
  res.status(200).send({
    students: _.omit(students, ["password"]),
    subscription,
    // papers,
    broadcast,
  });
};

export const logoutfromdevice = async (req, res) => {
  let student = await Student.findById(req.user._id);
  if (!student)
    throw new Error("This is an ivalid token no user in this email id");
  if (student.isloggedin === false)
    throw new Error("User is alderdy logged out");
  await Student.findByIdAndUpdate(req.user._id, { isloggedin: false });
  res.status(200).send({ message: "You are looged out succefully" });
};

export const all_data = async (req, res) => {
  const student = await Student.findById(req.user._id);
  const program = await Program.findById(student.program);
  const university = await University.findById(student.university);
  const subjects = await Subject.find({ program_id: program._id });
  let all_syllabus = [];
  let syllabus;
  let papers;
  await Promise.all(
    subjects.map(async (element) => {
      syllabus = await Syllabus.findOne({ subject_id: element._id });
      papers = await Paper.find({ subject_id: element._id });
      all_syllabus.push({
        subject: element,
        syllabus: syllabus,
        papers: papers,
      });
    })
  );
  let final_array = {
    university: university,
    program: program,
    academic_details: all_syllabus,
  };
  res.status(200).send(final_array);
};
