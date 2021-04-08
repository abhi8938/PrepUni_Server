const Joi=require('joi')
const mongoose=require('mongoose')

const Paper = mongoose.model(
  "paper",
  new mongoose.Schema(
    {
      subject_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required:true,
      },
    },
    {
      timestamps: true,
    }
  )
);

const validate = (paper) => {
  const schmea = Joi.object({
    subject_id: Joi.string().required(),
    link: Joi.string().required(),
    year: Joi.number().required(),
    title: Joi.string().required(),
  });

  return schmea.validate(paper);
};

const validateUpdate = (paper) => {
  const schmea = Joi.object({
    subject_id: Joi.string(),
    link: Joi.string(),
    year: Joi.number(),
    title: Joi.string(),
  });

  return schmea.validate(paper);
};

module.exports = {
  validateUpdate,
  validate,
  Paper
}