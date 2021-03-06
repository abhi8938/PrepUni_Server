const Joi=require('joi')
const mongoose=require('mongoose')

//TODO:Create Schema
// last_name
// email
// phone

const Session_Report = mongoose.model(
  "Session_Report",
  new mongoose.Schema({
    STID: {
      type: String,
      required: true,
    },
    PPID: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
      default: Date.now(),
    },
    last_loc: {
      type: String,
      required: true,
    },
  })
);

const validate = (student) => {
  //TODO:Create Schema
  const schema = Joi.object({
    duration: Joi.string().required(),
    last_loc: Joi.string().required(),
    PPID: Joi.string().required(),
  });

  return schema.validate(student);
};

module.exports = {
  validate,
  Session_Report
} 