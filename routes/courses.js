const express=require('express')
const Joi=require('joi');
const route=express.Router()


const courses=[
    {id:1,name:"bengali"},
    {id:2,name:"english"},
    {id:3,name:"hindi"}
]
const Schema=Joi.object({
        name:Joi.string().min(3).required()
})

route.get('/',(req,res)=>{
    res.send(courses);
})
route.post('/',(req,res)=>{
  
    const {error,value}=Schema.validate(req.body)
    if(error) return res.status(404).send(error.message); 
    const course={id:courses.length+1,
    name:req.body.name
    }
    courses.push(course);
    res.send(course);
})
route.put('/:id',(req,res)=>{
   const course=courses.find(c=>{
       if(c.id===parseInt(req.params.id)){
           return c;
       }
   })
   if(!course) return res.status(404).send("couse do not exist")
   const {error,value}=Schema.validate(req.body);
   if(error) return  res.status(202).send(error.message);
   course.name=req.body.name;
   res.send(courses)
})
route.delete('/:id',(req,res)=>{
    const course=courses.filter(c=>{
        if(c.id!=parseInt(req.params.id)){
            return c;
        }
    })
    if(!course) return res.status(404).send('course does not exists');
    res.send(course);
})

module.exports=route;