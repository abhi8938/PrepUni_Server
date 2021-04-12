require("express-async-errors");

const Annotations=require("../Routes/Annotations")
const Extras=require("../Routes/Extras")
const Packages=require("../Routes/Packages")
const Paper=require("../Routes/Paper")
const Payment=require("../Routes/Payments")
const Program=require("../Routes/Program")
const Resources=require('../Routes/Resources')
const Session_Report=require('../Routes/Session_Report')
const Students=require("../Routes/Students")
const Subject=require("../Routes/Subject")
const Subscriptions=require("../Routes/Subscriptions")
const Syllabus=require("../Routes/Syllabus")
const University=require("../Routes/University")
const asyncMiddleware=require("../Middlewares/async")
const error=require("../Middlewares/error")
const winston=require("winston")

const routes = (app) => {
  app.use("/api/students", Students); 
  app.use("/api/subscriptions", Subscriptions); 
  app.use("/api/extras", Extras);
  app.use("/api/annotations", Annotations);
  app.use("/api/packages", Packages);  //done
  app.use("/api/payment", Payment);
  app.use("/api/resources", Resources);
  app.use("/api/university", University); //done
  app.use("/api/program", Program); 
  app.use("/api/subject", Subject); 
  app.use("/api/paper", Paper); 
  app.use("/api/syllabus", Syllabus);   //done

  app.use(error);
};

module.exports=routes
