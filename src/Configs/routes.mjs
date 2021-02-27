import Annotations from "../Routes/Annotations.mjs";
import Extras from "../Routes/Extras.mjs";
import Packages from "../Routes/Packages.mjs";
import Paper_Products from "../Routes/Paper_Products.mjs";
import Payment from "../Routes/Payments.mjs";
import Resources from "../Routes/Resources.mjs";
import Session_Report from "../Routes/Session_Report.mjs";
import Students from "../Routes/Students.mjs";
import Subscriptions from "../Routes/Subscriptions.mjs";
// const error = require('../middleWare/error');
import postReq from "../ccavenue/ccavRequestHandler.mjs";
import postRes from "../ccavenue/ccavResponseHandler.mjs";

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
  app.get("/about", function (req, res) {
    res.render("dataFrom.html");
  });

  app.post("/ccavRequestHandler", function (request, response) {
    postReq(request, response);
  });

  app.post("/ccavResponseHandler", function (request, response) {
    postRes(request, response);
  });
};
