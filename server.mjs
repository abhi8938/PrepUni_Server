import bodyParser from "body-parser";
import config from "config";
import config_support from "./src/Configs/config.mjs";
import { connect_db } from "./src/Configs/mongo_connection.mjs";
import cors from "cors";
import { dirname } from "path";
import ejs from "ejs";
import error_supporter from "./src/Configs/logging.mjs";
import express from "express";
import { fileURLToPath } from "url";
import redirect from "express-redirect";
import { routes } from "./src/Configs/routes.mjs";
import winston from "winston";

error_supporter();
config_support();

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

connect_db();
routes(app);

const port = process.env.PORT || 3001;
const server=app.listen(port, () => winston.info("Listening On " + port));

export default server;