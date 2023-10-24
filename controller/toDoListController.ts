import ToDoListDao from "../dao/toDoListController";
import ToDoListService from "../service/toDoListService";
import { NextFunction, Request, Response } from "express";

async function getAllToDoList(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  try {
    const toDoListDao = new ToDoListDao(db);
    const toDoListService = new ToDoListService(toDoListDao);
    const result = await toDoListService.getAllToDoList();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all to do list",
        data: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function createToDoList(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { activity, username, priority } = req.body;
  try {
    const toDoListDao = new ToDoListDao(db);
    const toDoListService = new ToDoListService(toDoListDao);
    const result = await toDoListService.createToDoList(
      activity,
      username,
      priority
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a to do list",
        data: { _id: result.message },
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateToDoList(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { id } = req.params;
  const { activity, priority, dueDate, status } = req.body;
  try {
    const toDoListDao = new ToDoListDao(db);
    const toDoListService = new ToDoListService(toDoListDao);
    const result = await toDoListService.updateToDoList(
      id,
      activity,
      priority,
      status,
      dueDate
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a to do list",
        data: { totalModified: result.message },
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteToDoList(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { id } = req.params;
  try {
    const toDoListDao = new ToDoListDao(db);
    const toDoListService = new ToDoListService(toDoListDao);
    const result = await toDoListService.deleteToDoList(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a to do list",
        data: { totalDeleted: result.message },
      });
    }
  } catch (error) {
    next(error);
  }
}

export { getAllToDoList, createToDoList, updateToDoList, deleteToDoList };
