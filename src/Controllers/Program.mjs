import {
    Program,
    validate,
    validateUpdate,
  } from "../Validators/Program.mjs";

export const post_program=async (req,res)=>{
    const {error}=Validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let program=new Program(req.body);

    program=await program.save();

    res.send(program)
}