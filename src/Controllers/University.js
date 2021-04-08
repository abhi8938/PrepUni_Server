const {
    University,
    validate,
    validateUpdate
} =require("../Validators/University");
const mongoose=require('mongoose')

const get_universities=async(req,res)=>{
    const universities=await University.find().sort('Name');
    
    return res.status(200).send(universities)
}

const get_university=async(req,res)=>{
    const university_detail=await University.findById(req.params.id);
    if(!university_detail) throw new Error("No university based in this id");
    res.status(200).send(university_detail)
}

const post_universtiy=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message);
    let university_details=new University(req.body)
    university_details=await university_details.save()
    res.status(200).send(university_details);
}

const update_university=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    const university_details=await University.findByIdAndUpdate(
        req.params.id,req.body,{
            new:true,
        }
    )

    if(!university_details)
        throw new Error("The given id of the paclage is invalid");

    res.status(200).send(university_details)
}

module.exports = {
    update_university,
    post_universtiy,
    get_university,
    get_universities
}  