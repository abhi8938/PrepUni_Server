const Joi=require('joi')
const mongoose=require('mongoose')

const Syllabus=mongoose.model(
    'syllabus',
    new mongoose.Schema({
        subject_id:{
            type:mongoose.Schema.ObjectId,
            required:true,
            unique:true
        },
        units:[String]
    },{
        timestamps:true
    })
)

const validate=(syllabus)=>{
    const schema=Joi.object({
        subject_id:Joi.string().required(),
        units:Joi.array().required()
    })

    return schema.validate(syllabus)
}


const updatevalidate=(syllabus)=>{
    const schema=Joi.object({
        subject_id:Joi.string(),
        units:Joi.array()
    })

    return schema.validate(syllabus)
}

module.exports={
    updatevalidate,
    validate,
    Syllabus
}