const middleware=(req,res,next)=>{
  console.log("i am middleware1")
  next()
}

module.exports=middleware;