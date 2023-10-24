import { Router } from "express";
import {
  createToDoList,
  getAllToDoList,
  updateToDoList,
  deleteToDoList
} from "../controller/toDoListController";

const router = Router();

router.get("/", getAllToDoList);
router.post("/", createToDoList);
router.put("/:id", updateToDoList);
router.delete("/:id", deleteToDoList);

export default router;
