const taskRoutes = require("express").Router();
const taskData = require("../tasks.json");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const validator = require("../helpers/validator");
taskRoutes.use(bodyParser.json());

let writePath = path.join(__dirname, "..", "tasks.json");

taskRoutes.get("/", (req, res) => {
  let status = req.query.status;
  let isSort = req.query.sort;
  console.log(req.query);
  let filteredResult = status
    ? taskData.taskList.filter((obj) => obj.status === status)
    : taskData.taskList;
  if (isSort) {
    console.log("inside");
    filteredResult.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return res.status(200).json(filteredResult);
});

taskRoutes.get("/:id", (req, res) => {
  let taskId = req?.params?.id;
  let result = taskData?.taskList.filter((val) => val.id === taskId);
  if (!result || result.length == 0) {
    return res
      .status(404)
      .json("message : This particular task doesn't exist ");
  }
  return res.status(200).json(result);
});

taskRoutes.post("/", (req, res) => {
  const taskDetails = req.body;
  if (validator.validateTaskInfo(req.body, taskData).status) {
    let taskdataModified = taskData;
    taskdataModified.taskList.push(taskDetails);
    try {
      fs.writeFileSync(writePath, JSON.stringify(taskdataModified), {
        encoding: "utf-8",
        flag: "w",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Task not created! try again later" });
    }
    return res.status(200).json({ message: "Task created succesfully" });
  } else {
    return res.status(400).json(validator.validateTaskInfo(req.body, taskData));
  }
});

taskRoutes.put("/:id", (req, res) => {
  let taskId = req?.params?.id;
  let taskdataModified = taskData;
  if (validator.validateEditTaskInfo(req.body, taskData).status) {
    let result = taskData?.taskList.find((val) => val.id === taskId);
    let index = taskdataModified.taskList.indexOf(result);
    taskdataModified.taskList[index] = req.body;
    try {
      fs.writeFileSync(writePath, JSON.stringify(taskdataModified), {
        encoding: "utf-8",
        flag: "w",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Task not edited! try again later" });
    }
    return res.status(200).json({ message: "Task edited succesfully" });
  } else {
    return res
      .status(400)
      .json(validator.validateEditTaskInfo(req.body, taskData));
  }
});

taskRoutes.delete("/:id", (req, res) => {
  let taskId = req?.params?.id;
  let taskdataModified = taskData;
  if (validator.isTaskFound(taskId, taskData)) {
    let result = taskData?.taskList.find((val) => val.id === taskId);
    let index = taskdataModified.taskList.indexOf(result);
    taskdataModified.taskList.splice(index, 1);
    try {
      fs.writeFileSync(writePath, JSON.stringify(taskdataModified), {
        encoding: "utf-8",
        flag: "w",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Task not deleted! try again later" });
    }
    return res.status(200).json({ message: "Task deleted succesfully" });
  } else
    return res
      .status(400)
      .json({ message: "id to be deletd not found! sorry" });
});

module.exports = taskRoutes;
