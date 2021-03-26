import mongoose from "mongoose";
// var db = "mongodb://localhost:27017/prepuni";
var db ="mongodb+srv://admin_prep:waFHuMrPzPpwbjeq@prepuni.aj9c2.mongodb.net/prepuni?retryWrites=true&w=majority";
export const connect_db = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`connected to ${db}....`))
    .catch((err) =>
      console.log("Connection refused to database because....", err)
    );
};
