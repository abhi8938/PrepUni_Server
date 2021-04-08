const { Session_Report, validate } =require("../Validators/session_report");

const get_session_report = async (req, res) => {
  //TODO: Complete Request
  const students = await Student.find({
    STID: req.user._id,
  });
  res.status(200).send(students);
};

const post_session_report = async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new Error(error.details[0].message);

  let session_report = new Session_Report(req.body);

  session_report = await session_report.save();

  res.status(200).send(session_report);
};

module.exports = {
  post_session_report,
  get_session_report
}