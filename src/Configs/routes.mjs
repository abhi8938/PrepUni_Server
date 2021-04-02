import "express-async-errors";

import Annotations from "../Routes/Annotations.mjs";
import Extras from "../Routes/Extras.mjs";
import Packages from "../Routes/Packages.mjs";
import Paper from "../Routes/Paper.mjs";
import Payment from "../Routes/Payments.mjs";
import Program from "../Routes/Program.mjs";
import Resources from "../Routes/Resources.mjs";
import Session_Report from "../Routes/Session_Report.mjs";
import Students from "../Routes/Students.mjs";
import Subject from "../Routes/Subject.mjs";
import Subscriptions from "../Routes/Subscriptions.mjs";
import Syllabus from "../Routes/Syllabus.mjs";
import University from "../Routes/University.mjs";
import asyncMiddleware from "../Middlewares/async.mjs";
import error from "../Middlewares/error.mjs";
import winston from "winston";

export const routes = (app) => {
  app.use("/api/students", Students); //done
  app.use("/api/subscriptions", Subscriptions); //done
  app.use("/api/extras", Extras);
  app.use("/api/annotations", Annotations);
  app.use("/api/packages", Packages);
  app.use("/api/payment", Payment);
  app.use("/api/resources", Resources);
  app.use("/api/university", University); //done
  app.use("/api/program", Program); //done
  app.use("/api/subject", Subject); //done
  app.use("/api/paper", Paper); //done
  app.use("/api/syllabus", Syllabus); //done

  app.use(error);
};
