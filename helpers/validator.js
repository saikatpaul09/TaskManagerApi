class validator {
  static validateTaskInfo(taskInfo, taskData) {
    if (!this.validateUniqueTask(taskInfo, taskData)) {
      return {
        status: false,
        message: "please provide uniqie id",
      };
    }
    if (this.isvalidObject(taskInfo)) {
      return {
        status: true,
      };
    }
    return {
      status: false,
      message:
        "Wrong or incomplemete task details received, cannot create new task",
    };
  }

  static validateEditTaskInfo(taskInfo, taskData) {
    if (this.isvalidObject(taskInfo) && this.isTaskFound(taskInfo, taskData)) {
      return {
        status: true,
      };
    }
    return {
      status: false,
      message:
        "Wrong or incomplemete task details received, or the task you are trying to edit doesn't exist",
    };
  }

  static isvalidObject(taskInfo) {
    if (
      taskInfo.hasOwnProperty("id") &&
      taskInfo.hasOwnProperty("assignedBy") &&
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("date") &&
      taskInfo.hasOwnProperty("status") &&
      taskInfo.hasOwnProperty("priority")
    ) {
      return true;
    } else {
      return false;
    }
  }

  static validateUniqueTask(taskInfo, taskData) {
    if (this.isTaskFound(taskInfo, taskData)) return false;
    return true;
  }

  static isTaskFound(taskInfo, taskData) {
    let taskFound = false;
    let compareVal = taskInfo.id ? taskInfo.id : taskInfo;
    taskFound = taskData.taskList.some((ele) => ele.id == compareVal);
    if (taskFound) return true;
    return false;
  }
}

module.exports = validator;
