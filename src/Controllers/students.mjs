import { Student, validate } from "../Validators/student.mjs";

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
  });

  student = await student.save();

  res.send(student);
};

export const update_student = async (req, res) => {
  //TODO: Complete Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      first_name: req.body.first_name,
    },
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
