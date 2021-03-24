import {
    validate,
    Syllabus,
    updatevalidate
} from "../Validators/Syllabus.mjs"

export const post_syllabus=async(req,res)=>{

    const {error}=validate(req.body);
    if(error) throw new Error(error.details[0].message)

    let subject=new Syllabus(req.body)

    subject=await subject.save()

    res.send(subject);
}

export const get_syllabuss=async(req,res)=>{
    const all_sylabuss=await Syllabus.find()
    res.send(all_sylabuss)
}

export const get_syllabus=async(req,res)=>{
    const syllabus=await Syllabus.findById(req.params.id);
    if(!syllabus) throw new Error("No syllabus based in this ID")
    res.send(syllabus)
}

export const update_syllabus=async(req,res)=>{
    const {error}=updatevalidate(req.body)
    if(error) throw new Error(error.details[0].message)

    const syllabus=await Syllabus.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    if(!syllabus) throw new Error("There is no syllabus based on this ID")

    res.send(syllabus)
}