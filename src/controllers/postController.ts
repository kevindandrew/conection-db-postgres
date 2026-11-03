import type { Response, Request } from "express";
import { PostModel } from "../models/postModel.js";
import { UserModel } from "../models/userModel.js";
export async function getPosts(req: Request, res: Response) {
  try {
    const users = await PostModel.findAll();
    const usersFormat = await Promise.all(
      users.map(async (post) => {
        let usuario = await UserModel.findById(post.user_id);
        let formatoCorrecto = {
          id: post.id,
          title: post.title,
          content: post.content,
          user: usuario.name,
        };
        console.log(formatoCorrecto);
        return formatoCorrecto;
      }),
    );
    res.status(200).json(usersFormat);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener todos los posts",
      detalles: error.mesagge,
    });
  }
}
