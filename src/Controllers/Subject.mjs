import { Subject, validate, validateUpdate } from "../Validators/Subject.mjs";

export const post_subject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let subject = new Subject(req.body);

  subject = await subject.save();
  res.status(200).send(subject);
};

export const get_subjects = async (req, res) => {
  let subjects;
  if (req.params.id) {
    subjects = await Subject.find({ program_id: req.params.id });
  } else {
    subjects = await Subject.find().sort("name");
  }
  res.status(200).send(subjects);
};

export const get_subject = async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) throw new Error("No subject based on this ID");
  res.status(200).send(subject);
};

export const update_subject = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) throw new Error(error.details[0].message);

  const updateSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updateSubject) throw new Error("There is no subject based on this ID");

  res.status(200).send(updateSubject);
};
