import { Collection, Db, ObjectId } from "mongodb";
import StandardError from "../constants/standardError";
import { ToDolistData } from "../types";
import { format } from "date-fns";
import { JWT_SIGN } from "../middleware/config/jwtConfig.js";

interface Database {
  collection: (name: string) => Collection;
}

class ToDoListDao {
  private db: Database;

  constructor(db: Db) {
    this.db = db;
  }

  async findAllToDoList() {
    const toDoList = await this.db.collection("toDoList").find().toArray();
    if (!toDoList) {
      throw new StandardError({
        success: false,
        message: "No to do list found",
        status: 404,
      });
    }
    return toDoList;
  }

  async createToDoList(
    activity: string,
    username: string,
    priority: string,
    dueDate: string
  ) {
    const defaultStatus = "Not Started";
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd");
    newDate.setDate(newDate.getDate() + 3);
    const defaultDueDate = format(newDate, "yyyy-MM-dd");

    if (!dueDate || dueDate === "") {
      dueDate = defaultDueDate;
    }

    if (!JWT_SIGN) {
      throw new StandardError({
        success: false,
        message: "JWT_SIGN is not defined",
        status: 500,
      });
    }
    const newToDoList: ToDolistData = {
      activity,
      username,
      priority,
      dueDate,
      status: defaultStatus,
      createdDate,
    };

    const isUserExists = await this.db.collection("users").findOne({
      username,
    });

    if (!isUserExists) {
      throw new StandardError({
        success: false,
        message: "User not found",
        status: 404,
      });
    }

    const toDoList = await this.db
      .collection("toDoList")
      .insertOne(newToDoList);

    return toDoList;
  }

  async updateToDoList(
    id: string,
    activity?: string,
    priority?: string,
    status?: string,
    dueDate?: string
  ) {
    const objectId = new ObjectId(id);
    const toDoListData: Partial<ToDolistData> = {};
    if (activity) {
      toDoListData.activity = activity;
    }
    if (priority) {
      toDoListData.priority = priority;
    }
    if (status) {
      toDoListData.status = status;
    }
    if (dueDate) {
      toDoListData.dueDate = dueDate;
    }
    const toDoList = await this.db.collection("toDoList").updateOne(
      { _id: objectId },
      {
        $set: toDoListData,
      }
    );
    return toDoList;
  }

  async deleteToDoList(id: string) {
    const objectId = new ObjectId(id);
    const getToDoList = await this.db
      .collection("toDoList")
      .findOne({ _id: objectId });
    if (!getToDoList) {
      throw new StandardError({
        success: false,
        message: "To do list not found",
        status: 404,
      });
    }
    const toDoList = await this.db
      .collection("toDoList")
      .deleteOne({ _id: objectId });
    return toDoList;
  }
}

export default ToDoListDao;
