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

  async getProfileUser(username: string) {
    try {
      const user = await this.UserDao.findProfileUser(username);
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

  async updateRole(id: string, role: string) {
    const allowedRole = ["user", "admin", "manager"];

    if (!allowedRole.includes(role.toLowerCase())) {
      throw new StandardError({
        success: false,
        message: "Role can only be user, admin or manager",
        status: 400,
      });
    }

    try {
      const user = await this.UserDao.updateRole(id, role);
      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }
      return { success: true, message: user.modifiedCount };
    } catch (error: any) {
      console.log("Error", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateTeam(id: string, team: string) {
    const allowedTeam = [
      "team 1",
      "team 2",
      "team 3",
      "team 4",
      "team 5",
      "team 6",
    ];

    if (!allowedTeam.includes(team.toLowerCase())) {
      throw new StandardError({
        success: false,
        message: "Invalid team. Please input available team name.",
        status: 409,
      });
    }
    try {
      const user = await this.UserDao.updateTeam(id, team);
      if (!user) {
        throw new StandardError({
          success: false,
          message: "Can't update team. Please try again.",
          status: 409,
        });
      }
      return { success: true, message: user.modifiedCount };
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
