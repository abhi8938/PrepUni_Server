import {
    University,
    validate,
    validateUpdate
} from "../Validators/University.mjs";

export const get_universities=async(req,res)=>{
    const universities=await University.find().sort('Name');
    
    return res.send(universities)
}

export const get_university=async(req,res)=>{
    const university_detail=await University.findById(req.params.id);
    if(!university_detail) throw new Error("No university based in this id");
    res.send(university_detail)
}

export const post_universtiy=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message);
    let university_details=new University(req.body)
    university_details=await university_details.save()
    res.send(university_details);
}

export const update_university=async(req,res)=>{
    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    const university_details=await University.findByIdAndUpdate(
        req.params.id,req.body,{
            new:true,
        }
    )

    if(!university_details)
        throw new Error("The given id of the paclage is invalid");

    res.send(university_details)
}