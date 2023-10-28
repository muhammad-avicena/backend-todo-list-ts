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
  const { username } = req.user;

  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getProfileUser(username);
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

async function updateRole(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { id } = req.params;
  const { role } = req.body;

  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.updateRole(id, role);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update role",
        data: { totalModified: result.message },
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateTeam(req: Request, res: Response, next: NextFunction) {
  const { db } = req;
  const { id } = req.params;
  const { team } = req.body;

  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.updateTeam(id, team);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update team",
        data: { totalModified: result.message },
      });
    }
  } catch (error) {
    next(error);
  }
}

export { getAllUser, getUserById, getProfileUser, updateRole, updateTeam };
