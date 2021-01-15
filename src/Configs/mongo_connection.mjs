import mongoose from "mongoose";

export const connect_db = () => {
  mongoose
    .connect("mongodb://localhost/prepuni", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to Database...."))
    .catch((err) =>
      console.log("Connection refused to database because....", err)
    );
};
