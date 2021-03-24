import {Student} from '../Validators/student.mjs'

export const checkLogin = async (req, res, next) => {
  let student
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.id)) {
    student = await Student.findOne({ email: req.body.id });
    if (!student) throw new Error("Invalid Email");
  } else if (/^\d{10}$/.test(req.body.id)) {
    student = await Student.findOne({ contact: req.body.id });
    if (!student) throw new Error("Invalid Phone number");
  } else {
    student = await Student.findOne({ user_name: req.body.id });
    if (!student) throw new Error("Invalid User name");
  }
  if(student.isloggedin===true) throw new Error("Please logout from other devices")
  await Student.findByIdAndUpdate(student._id,{isloggedin:true});
  next();
};

export const logoutfromdevice=async(req,res)=>{
  let student=await Student.findById(req.user._id)
  if(!student) throw new Error ("This is an ivalid token no user in this email id")
  if(student.isloggedin===false) throw new Error ("User is alderdy logged out")
  await Student.findByIdAndUpdate(req.user._id,{isloggedin:false});
  res.send({"message":"You are looged out succefully"})
}