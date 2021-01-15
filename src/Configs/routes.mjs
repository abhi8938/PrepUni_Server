import Extras from "../Routes/Extras.mjs";
import Packages from "../Routes/Packages.mjs";
import Paper_Products from "../Routes/Paper_Products.mjs";
import Students from "../routes/Students.mjs";
import Study_Materials from "../Routes/Packages.mjs";
import Subscriptions from "../Routes/Subscriptions.mjs";
// const error = require('../middleWare/error');
export const routes = (app) => {
  app.use("/api/students", Students);
  app.use("/api/subscriptions", Subscriptions);
  app.use("/api/extras", Extras);
  app.use("/api/study_materials", Study_Materials);
  app.use("/api/paper_products", Paper_Products);
  app.use("/api/packages", Packages);
};
