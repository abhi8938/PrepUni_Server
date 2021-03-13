import mongoose from "mongoose";

export const connect_db = () => {
  mongoose
    .connect("mongodb+srv://admin_prep:waFHuMrPzPpwbjeq@prepuni.aj9c2.mongodb.net/prepuni", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to Database...."))
    .catch((err) =>
      console.log("Connection refused to database because....", err)
    );
};
