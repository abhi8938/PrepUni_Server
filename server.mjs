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
if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: jwtPrivate key is no defined");
  process.exit(1);
}
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

// if(app.get('env') === 'development'){
// app.use(morgan('tiny'));
// startupDebugger('morgan enabled');
// }

connect_db();
routes(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening On " + port));
