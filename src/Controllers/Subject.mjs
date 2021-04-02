import { Subject, validate, validateUpdate } from "../Validators/Subject.mjs";

import { Paper } from "../Validators/Paper.mjs";

export const post_subject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let subject = new Subject(req.body);

  subject = await subject.save();
  res.status(200).send(subject);
};

export const get_subjects = async (req, res) => {
  if (!req.params.id) throw new Error("No Subject Id in Param");
  let subjects = await Subject.find({ program_id: req.params.id });
  const resp = subjects.map(async (sub, index) => {
    return Paper.find({ subject_id: sub._id });
  });
  const papers = await Promise.all(resp);
  subjects.map((sub, ind) => {
    const x = { ...JSON.parse(JSON.stringify(sub)), papers: papers[ind] };
    subjects[ind] = x;
  });
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
