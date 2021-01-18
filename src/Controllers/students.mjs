import { Student, validate,validateUpdate } from "../Validators/student.mjs";

export const get_students = async (req, res) => {
  //TODO: Complete Request
  const students = await Student.find().sort("first_name");
  res.send(students);
};

export const post_student = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender:req.body.gender,
    contact:req.body.contact,
    display_name:req.body.display_name,
    dob:req.body.dob,
    email:req.body.email,
    password:req.body.password,
    device_token: req.body.device_token,
    course:req.body.course,
    college:req.body.college,
    semester:req.body.semester,
    university:req.body.university,
    type:req.body.type,
  });

  student = await student.save();

  res.send(student);
};

export const update_student = async (req, res) => {
  //TODO: Complete Request
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message)
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!student)
    return res
      .status(404)
      .send("The Student with the given id is not available");

  res.send(student);
};

export const authenticate = async (req, res) => {
  //TODO: Complete Request
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({
    // first_name: req.body.first_name,
  });

  student = await student.save();

  res.send(student);
};

// export const delete_student = (req, res) => {
//TODO Request
// };
