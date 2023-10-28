import StandardError from "../constants/standardError";
import { ToDoListInterface } from "../types";

class ToDoListService {
  private toDoListDao: ToDoListInterface;

  constructor(toDoListDao: ToDoListInterface) {
    this.toDoListDao = toDoListDao;
  }

  async getAllToDoList() {
    try {
      const toDoList = await this.toDoListDao.findAllToDoList();
      if (!toDoList) {
        throw new StandardError({
          success: false,
          message: "No to do list found",
          status: 404,
        });
      }
      if (toDoList.length === 0) {
        return {
          success: true,
          message: "Empty to do list",
        };
      }
      return { success: true, message: toDoList };
    } catch (error: any) {
      console.log("Error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createToDoList(
    activity: string,
    username: string,
    priority: string,
    dueDate?: string
  ) {
    if (!activity || !username || !priority) {
      throw new StandardError({
        success: false,
        message: "To do list activity, username and status cannot be empty",
        status: 400,
      });
    }

    const allowedPriority = ["low", "medium", "high"];
    if (!allowedPriority.includes(priority.toLowerCase())) {
      throw new StandardError({
        success: false,
        message: "Priority can only be low, medium or high",
        status: 400,
      });
    }

    try {
      const toDoList = await this.toDoListDao.createToDoList(
        activity,
        username,
        priority,
        dueDate
      );
      if (!toDoList) {
        throw new StandardError({
          success: false,
          message: "Failed to create to do list",
          status: 500,
        });
      }
      return { success: true, message: toDoList.insertedId };
    } catch (error: any) {
      console.log("error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateToDoList(
    id: string,
    activity?: string,
    priority?: string,
    status?: string,
    dueDate?: string
  ) {
    const allowedPriority = ["low", "medium", "high"];
    if (priority && !allowedPriority.includes(priority.toLowerCase())) {
      throw new StandardError({
        success: false,
        message: "Priority can only be low, medium or high",
        status: 400,
      });
    }

    const allowedStatus = ["not started", "in progress", "completed"];
    if (status && !allowedStatus.includes(status.toLowerCase())) {
      throw new StandardError({
        success: false,
        message: "Status can only be not started, in progress or completed",
        status: 400,
      });
    }

    try {
      const toDoList = await this.toDoListDao.updateToDoList(
        id,
        activity,
        priority,
        status,
        dueDate
      );
      if (!toDoList) {
        throw new StandardError({
          success: false,
          message: "Failed to update to do list",
          status: 500,
        });
      }
      return { success: true, message: toDoList.modifiedCount };
    } catch (error: any) {
      console.log("error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteToDoList(id: string) {
    try {
      const toDoList = await this.toDoListDao.deleteToDoList(id);
      if (!toDoList) {
        throw new StandardError({
          success: false,
          message: "Failed to delete to do list",
          status: 500,
        });
      }
      return { success: true, message: toDoList.deletedCount };
    } catch (error: any) {
      console.log("error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default ToDoListService;
