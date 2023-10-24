import { Router } from "express";
import {
  getAllUser,
  getUserById,
  getProfileUser,
  updateRole,
  updateTeam,
} from "../controller/userController";

const router = Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.get("/token/profile", getProfileUser);
router.patch("/role/:id", updateRole);
router.patch("/team/:id", updateTeam);

export default router;
