const { Subject, validate, validateUpdate } = require("../Validators/Subject");
const { Syllabus } = require("../Validators/Syllabus");

const { Paper } = require("../Validators/Paper");

const post_subject = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let subject = new Subject(req.body);

  subject = await subject.save();
  res.status(200).send(subject);
};

const get_subjects = async (req, res) => {
  if (req.params.id) {
    let subjects = await Subject.find({ program_id: req.params.id });
    const resp = subjects.map(async (sub, index) => {
      return Paper.find({ subject_id: sub._id });
    });
    const syllab = await subjects.map(async (sub, index) => {
      return Syllabus.findOne({ subject_id: sub._id });
    });
    const papers = await Promise.all(resp);
    const syllabus = await Promise.all(syllab);
    subjects.map((sub, ind) => {
      const x = {
        ...JSON.parse(JSON.stringify(sub)),
        papers: papers[ind],
        syllabus: syllabus[ind],
      };
      subjects[ind] = x;
    });
    res.status(200).send(subjects);
  } else {
    let subjects = await Subject.find();
    res.status(200).send(subjects);
  }
};

const get_subject = async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) throw new Error("No subject based on this ID");
  res.status(200).send(subject);
};

const update_subject = async (req, res) => {
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

module.exports = {
  update_subject,
  get_subject,
  get_subjects,
  post_subject,
};
