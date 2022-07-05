const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const dbCondig = require("./dbConfig/db");
const imageRoute = require("./router/image.route");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbCondig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connect successful");
    },
    (err) => {
      console.log(err);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/", imageRoute);

const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
