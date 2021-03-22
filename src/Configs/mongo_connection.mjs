import mongoose from "mongoose";

let local_host_link="mongodb://localhost:27017/prepuni"
let main_link="mongodb+srv://admin_prep:waFHuMrPzPpwbjeq@prepuni.aj9c2.mongodb.net/prepuni?retryWrites=true&w=majority"
export const connect_db = () => {
  mongoose
    .connect(local_host_link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to Database...."))
    .catch((err) =>
      console.log("Connection refused to database because....", err)
    );
};
 