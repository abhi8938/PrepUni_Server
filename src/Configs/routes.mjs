import "express-async-errors";
import winston from "winston";
import Annotations from "../Routes/Annotations.mjs";
import Extras from "../Routes/Extras.mjs";
import Packages from "../Routes/Packages.mjs";
import Paper_Products from "../Routes/Paper_Products.mjs";
import Payment from "../Routes/Payments.mjs";
import Resources from "../Routes/Resources.mjs";
import Session_Report from "../Routes/Session_Report.mjs";
import Students from "../Routes/Students.mjs";
import Subscriptions from "../Routes/Subscriptions.mjs";
import University from "../Routes/University.mjs"
import Program from "../Routes/Program.mjs"
// const error = require('../middleWare/error');
import postReq from "../ccavenue/ccavRequestHandler.mjs";
import postRes from "../ccavenue/ccavResponseHandler.mjs";
import error from "../Middlewares/error.mjs";
import asyncMiddleware from "../Middlewares/async.mjs";



export const routes = (app) => {

  app.use("/api/students", Students);
  app.use("/api/subscriptions", Subscriptions);
  app.use("/api/extras", Extras);
  app.use("/api/annotations", Annotations);
  app.use("/api/paper_products", Paper_Products);
  app.use("/api/packages", Packages);
  app.use("/api/session_report", Session_Report);
  app.use("/api/payment", Payment);
  app.use("/api/resources", Resources);
  app.use("/api/University",University)
  app.use("/api/Program",Program);

  app.use(error);
};
