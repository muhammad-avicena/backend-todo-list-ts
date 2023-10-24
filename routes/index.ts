import { Router } from "express";
import authRouter from "./authRouter";
import homeRouter from "./homeRouter";
import toDoListRouter from "./toDoListRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/", homeRouter);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/todos", toDoListRouter);
router.use("/api/v1/users", userRouter);

export default router;
