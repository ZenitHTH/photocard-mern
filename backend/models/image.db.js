const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: String,
  title:String
});

module.exports = mongoose.model("imageSchema",imageSchema);
