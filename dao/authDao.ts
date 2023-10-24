import { Collection, Db } from "mongodb";
import StandardError from "../constants/standardError";
import { format } from "date-fns";

interface Database {
  collection: (name: string) => Collection;
}

interface UserData {
  username: string;
  password: string;
  role: string;
  team: string;
  email: string;
  createdDate: string;
}

class AuthDao {
  private db: Database;

  constructor(db: Db) {
    this.db = db;
  }

  async loginUser(userInfo: { username: string }) {
    const { username } = userInfo;
    const user = await this.db.collection("users").findOne({ username });
    if (!user) {
      throw new StandardError({
        status: 401,
        message: "Incorrect username or password. Please try again.",
        success: false,
      });
    }
    return user;
  }

  async registerUser(userInfo: {
    username: string;
    password: string;
    email: string;
  }) {
    const { username, password, email } = userInfo;
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd");
    const role = "member";
    const team = "none";

    const userData: UserData = {
      username,
      password,
      role,
      team,
      email,
      createdDate,
    };

    const isUserTaken = await this.db.collection("users").findOne({
      $or: [{ username }, { email }],
    });
    if (isUserTaken) {
      throw new StandardError({
        success: false,
        message: "Username or email is not available. Please try another",
        status: 409,
      });
    }
    const result = await this.db.collection("users").insertOne(userData);
    return result;
  }
}

export default AuthDao;
