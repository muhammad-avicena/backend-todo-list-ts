import { Router } from "express";
import {
  getAllUser,
  getUserById,
  getProfileUser,
  updateRole,
  updateTeam,
} from "../controller/userController";
import {
  managerAuthorization,
  adminAuthorization,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/token/profile", getProfileUser);
router.get("/", adminAuthorization, getAllUser);
router.get("/:id", adminAuthorization, getUserById);
router.patch("/role/:id", managerAuthorization, updateRole);
router.patch("/team/:id", adminAuthorization, updateTeam);

export default router;
