import winston from "winston";
import bodyParser from "body-parser";
import config from "config";
import { connect_db } from "./src/Configs/mongo_connection.mjs";
import cors from "cors";
import { dirname } from "path";
import ejs from "ejs";
import express from "express";
import { fileURLToPath } from "url";
import redirect from "express-redirect";
import { routes } from "./src/Configs/routes.mjs";

import error_supporter from "./src/Configs/logging";
import config_support from "./src/Configs/config";
error_supporter()
config_support()


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
redirect(app);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.set("views", __dirname + "/public");
app.engine("html", ejs.renderFile);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('',(req,res)=>{
  throw new Error("This is not working")
  res.send({
    "Id":"Its working"
  })
})
connect_db();
routes(app);

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info("Listening On " + port));
