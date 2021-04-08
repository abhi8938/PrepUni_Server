const {
    Syllabus,
    updatevalidate,
    validate
} =require("../Validators/Syllabus")

const post_syllabus=async(req,res)=>{

    const {error}=validate(req.body);
    if(error) throw new Error(error.details[0].message)

    let duplicate_cheker=await Syllabus.findOne({subject_id:req.body.subject_id})
    if(duplicate_cheker) throw new Error("Syllabus for this subject is aldredy defined")

    let subject=new Syllabus(req.body)

    subject=await subject.save()

    res.status(200).send(subject);
}

const get_syllabuss=async(req,res)=>{
    const all_sylabuss=await Syllabus.find()
    res.status(200).send(all_sylabuss)
}

const get_syllabus=async(req,res)=>{
    const syllabus=await Syllabus.findById(req.params.id);
    if(!syllabus) throw new Error("No syllabus based in this ID")
    res.status(200).send(syllabus)
}

const update_syllabus=async(req,res)=>{
    const {error}=updatevalidate(req.body)
    if(error) throw new Error(error.details[0].message)

    const syllabus=await Syllabus.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    if(!syllabus) throw new Error("There is no syllabus based on this ID")

    res.status(200).send(syllabus)
}

module.exports = {
    update_syllabus,
    get_syllabus,
    get_syllabuss,
    post_syllabus
}