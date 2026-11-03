import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
} from "../controllers/userController.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);

export default router;
