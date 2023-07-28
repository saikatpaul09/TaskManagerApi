const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router();
const taskInfo = require("./routes/taskInfo");

const app = express();
app.use(routes);
app.use(bodyParser.json());

routes.use("/tasks", taskInfo);
const PORT = 3000;
app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server running succesfully on port 3000");
  } else {
    console.log("Error occured");
  }
});
