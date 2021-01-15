import bodyParser from "body-parser";
import { connect_db } from "./src/Configs/mongo_connection.mjs";
import cors from "cors";
import express from "express";
import redirect from "express-redirect";
import { routes } from "./src/Configs/routes.mjs";
// import { ejs } from "consolidate";

const app = express();
redirect(app);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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
