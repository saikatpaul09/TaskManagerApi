class validator {
  static validateTaskInfo(taskInfo, taskData) {
    if (!this.validateUniqueTask(taskInfo, taskData)) {
      return {
        status: false,
        message: "please provide uniqie id",
      };
    }
    if (
      taskInfo.hasOwnProperty("id") &&
      taskInfo.hasOwnProperty("assignedBy") &&
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("date") &&
      taskInfo.hasOwnProperty("status") &&
      taskInfo.hasOwnProperty("priority")
    ) {
      return {
        status: true,
        message: "task created succesfully",
      };
    }
    return {
      status: false,
      message:
        "Wrong or incomplemete task details received, cannot create new task",
    };
  }

  static validateUniqueTask(taskInfo, taskData) {
    let taskFound = taskData.taskList.some((ele) => ele.id == taskInfo.id);
    if (taskFound) return false;
    return true;
  }
}

module.exports = validator;
