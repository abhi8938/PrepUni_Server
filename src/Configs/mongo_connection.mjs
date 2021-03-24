import mongoose from "mongoose";
var local_host="mongodb://localhost:27017/prepuni"
var main_link="mongodb+srv://admin_prep:waFHuMrPzPpwbjeq@prepuni.aj9c2.mongodb.net/prepuni?retryWrites=true&w=majority"
export const connect_db = () => {
  mongoose
    .connect(local_host,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => console.log("connected to Database...."))
    .catch((err) =>
      console.log("Connection refused to database because....", err)
    );
};
