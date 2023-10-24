import { Router } from "express";
import {
  getAllUser,
  getUserById,
  getProfileUser,
} from "../controller/userController";

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.get("/token/profile", getProfileUser);

export default router;
