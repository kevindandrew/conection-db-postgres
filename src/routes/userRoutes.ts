import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createUserSchema,
  getUsersQuerySchema,
  updateUserSchema,
} from "../schemas/userSchema.js";
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", validateSchema(createUserSchema, "body"), createUser);
router.put("/users/:id", validateSchema(updateUserSchema, "body"), updateUser);
router.delete("/users/:id", deleteUser);

export default router;
