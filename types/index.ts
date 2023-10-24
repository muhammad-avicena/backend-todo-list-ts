export interface ToDoListInterface {
  findAllToDoList(): Promise<any>;
  createToDoList(
    activity: string,
    username: string,
    priority: string
  ): Promise<any>;
  updateToDoList(
    id: string,
    activity?: string,
    priority?: string,
    status?: string,
    dueDate?: string
  ): Promise<any>;
  deleteToDoList(id: string): Promise<any>;
}

export interface ToDolistData {
  activity: string;
  username: string;
  priority: string;
  dueDate?: string;
  status?: string;
  createdDate?: string;
}

export interface AuthDaoInterface {
  loginUser(userInfo: { username: string; password: string }): Promise<any>;
  registerUser(userInfo: {
    username: string;
    password: string;
    email: string;
  }): Promise<any>;
}

export interface UserDaoInterface {
  findAllUsers(): Promise<any>;
  findUserById(id: string): Promise<any>;
  findProfileUser(token: string): Promise<any>;
  updateRole(id: string, role: string): Promise<any>;
  updateTeam(id: string, team: string): Promise<any>;
}
