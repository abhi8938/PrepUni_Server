const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/prepuni", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Database"))
  .catch((err) => console.log("Connection Error: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
