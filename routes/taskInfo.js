const taskRoutes = require("express").Router();
const taskData = require("../tasks.json");
const bodyParser = require("body-parser");
const fs = require("fs");
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  return res.status(200).json(taskData);
});

module.exports = taskRoutes;
