import {
    Program,
    validate,
    validateUpdate,
  } from "../Validators/Program.mjs";

export const post_program=async (req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let program=new Program(req.body);

    program=await program.save();

    res.send(program)
}

export const get_programs=async(req,res)=>{
    const programs=await Program.find().sort('name');
    res.send(programs)
}

export const get_program=async(req,res)=>{
    const program=await Program.findById(req.params.id);
    res.send(program)
}

export const update_program=async(req,res)=>{
    // console.log("its working")
    const {error}=validateUpdate(req.body)
    // console.log("its working")
    if(error) throw new Error(error.details[0].message)
    // console.log("its working")

    const updatedprogram=await Program.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    // console.log("its working")

    if(!updatedprogram) throw new Error("There is no program with the given id");

    res.send(updatedprogram)
}