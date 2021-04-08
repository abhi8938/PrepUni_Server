const Joi=require('joi')
const mongoose=require('mongoose')

const Program = mongoose.model(
  "program",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      university_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      semester: [{
        type: Number,
        required: true,
      }],
    },
    {
      timestamps: true,
    }
  )
);

const validate = (course) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    university_id: Joi.string().required(),
    semester: Joi.array().items(Joi.number().required()).required(),
  });

  return schema.validate(course);
};

const validateUpdate = (course) => {
  const schema = Joi.object({
    name: Joi.string(),
    university_id: Joi.string(),
    semester: Joi.array().items(Joi.number()),
  });

  return schema.validate(course);
};

module.exports={
  validateUpdate,
  validate,
  Program
}