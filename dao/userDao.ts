import { Db, Collection, ObjectId } from "mongodb";
import StandardError from "../constants/standardError";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SIGN } from "../middleware/config/jwtConfig.js";

interface Database {
  collection: (name: string) => Collection;
}

class UserDao {
  private db: Database;

  constructor(db: Db) {
    this.db = db;
  }

  async findAllUsers() {
    const users = await this.db.collection("users").find().toArray();
    if (!users) {
      throw new StandardError({
        success: false,
        message: "No users found",
        status: 404,
      });
    }
    return users;
  }

  async findUserById(id: string) {
    const objectId = new ObjectId(id);
    const user = await this.db.collection("users").findOne({ _id: objectId });
    if (!user) {
      throw new StandardError({
        success: false,
        message: "User not found",
        status: 404,
      });
    }
    return user;
  }

  async findProfileUser(username: string) {
    const projection = {
      password: 0,
    };

    const user = await this.db
      .collection("users")
      .findOne({ username }, { projection });
    return user;
  }

  async updateRole(id: string, role: string) {
    const objectId = new ObjectId(id);
    const user = await this.db
      .collection("users")
      .updateOne({ _id: objectId }, { $set: { role } });
    if (!user) {
      throw new StandardError({
        success: false,
        message: "User not found",
        status: 404,
      });
    }
    return user;
  }

  async updateTeam(id: string, team: string) {
    const objectId = new ObjectId(id);
    const user = await this.db
      .collection("users")
      .updateOne({ _id: objectId }, { $set: { team } });
    if (!user) {
      throw new StandardError({
        success: false,
        message: "User not found",
        status: 404,
      });
    }
    return user;
  }
}

export default UserDao;
