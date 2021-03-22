import {
    Paper,
    validate,
    validateUpdate
} from "../Validators/Paper.mjs"

export const post_paper=async (req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let paper=new Paper(req.body)

    paper=await paper.save()
    res.send(paper)
}

export const get_papers=async(req,res)=>{
    const papers=await Paper.find().sort('year')

    return res.send(papers)
}

export const get_paper=async(req,res)=>{
    const paper=await Paper.findById(req.params.id);
    if(!paper) throw new Error("No papers based based on the Given ID")
    res.send(paper)
}