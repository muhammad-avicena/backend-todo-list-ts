import UserDao from "../dao/userDao";
import UserService from "../service/userService";
import { NextFunction, Request, Response } from "express";

async function getAllUser(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getAllUsers();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all users",
        data: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { id } = req.params;
  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getUserById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a user",
        data: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getProfileUser(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { token } = req.body;
  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getProfileUser(token);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a user",
        data: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
}

export { getAllUser, getUserById, getProfileUser };
