import StandardError from "../constants/standardError";
import { UserDaoInterface } from "../types";

class UserService {
  private UserDao: UserDaoInterface;

  constructor(UserDao: UserDaoInterface) {
    this.UserDao = UserDao;
  }

  async getAllUsers() {
    try {
      const users = await this.UserDao.findAllUsers();
      if (!users) {
        throw new StandardError({
          success: false,
          message: "No users found",
          status: 404,
        });
      }
      return { success: true, message: users };
    } catch (error: any) {
      console.log("Error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.UserDao.findUserById(id);
      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }
      return { success: true, message: user };
    } catch (error: any) {
      console.log("Error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getProfileUser(token: string) {
    try {
      const user = await this.UserDao.findProfileUser(token);
      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }
      return { success: true, message: user };
    } catch (error: any) {
      console.log("Error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default UserService;
