import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", postRouter);

app.get("/", function (req: Request, res: Response) {
  res.json({
    mensaje: "API CON EXPRESS FUNCIONANDO AL 100%",
  });
});

app.listen(PORT, function () {
  console.log(`servidor corriendo en: http://localhost:${PORT}`);
});
/* 
  paso 1 clonar el repositorio
  paso 2 correr el sql
  paso 3 correr npm i 
  paso 4 crear unafuncion de tipo get by id en controller
  paso 5 agregarlo al router
  paso 6 agregarlo al index
  paso 7 probarlo
*/
