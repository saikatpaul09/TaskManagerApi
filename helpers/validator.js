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

  static validateEditTaskInfo(taskInfo, taskId, taskData) {
    if (
      this.isvalidObject(taskInfo) &&
      this.isTaskFound(taskId, taskData).status
    ) {
      return {
        status: true,
        index: this.isTaskFound(taskId, taskData).index,
        message: "task edited succesfully",
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
    if (this.isTaskFound(taskInfo, taskData).status) return false;
    return true;
  }

  static isTaskFound(taskInfo, taskData) {
    let compareVal = taskInfo.id ? taskInfo.id : taskInfo;
    let taskIndex = taskData?.taskList?.findIndex(
      (ele) => ele.id == compareVal
    );
    console.log(taskIndex);
    if (taskIndex >= 0)
      return {
        status: true,
        index: taskIndex,
      };
    return false;
  }
}

module.exports = validator;
