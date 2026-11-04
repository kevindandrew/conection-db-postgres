import { Router } from "express";
import { getPosts } from "../controllers/postController.js";
const router = Router();

router.get("/posts", getPosts);
/* 
COMPLETAR EL CRUD DE LA TABLA POSTS
GET POR ID
POST CON VALIDACION
PUT CON VALIDACION
DELETE
*/
export default router;
