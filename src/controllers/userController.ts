import type { Response, Request } from "express";
import { UserModel } from "../models/userModel.js";
import type { GetUserQueryInput } from "../schemas/userSchema.js";
import { getUsersQuerySchema } from "../schemas/userSchema.js";
export async function getUsers(
  req: Request<{}, {}, {}, GetUserQueryInput>,
  res: Response,
) {
  try {
    const result = getUsersQuerySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        error: "Parámetros de consulta inválidos",
        detalles: result.error.format(),
      });
    }
    const { name, email, limit, page } = result.data;
    const users = await UserModel.findAll({ name, email, limit, page });
    res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener todos los usuarios",
      detalles: error.mesagge,
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  if (!idBuscado) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const usuario = await UserModel.findById(idBuscado);
    if (!usuario) {
      return res.status(404).json({
        mensaje: "el usuario con ese id no existe o no fue encontrado",
      });
    }
    res.status(200).json({ ok: true, data: usuario });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener todos los usuarios",
      detalles: error.mesagge,
    });
  }
}

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  try {
    const userExist = await UserModel.findByEmail(email);
    if (userExist) {
      return res
        .status(400)
        .json({ error: "ya existe un usuario con ese correo" });
    }
    const newUser = await UserModel.create(name, email);
    res.status(201).json({
      ok: true,
      data: newUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el usuario",
      detalles: error.mesagge,
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const idBuscado = Number(req.params.id);
  if (!idBuscado) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const userFind = await UserModel.findById(idBuscado);
    if (!userFind) {
      return res.status(404).json({
        mesagge: "el usuario con ese id no existe",
      });
    }
    const userUpdate = await UserModel.update(idBuscado, name, email);
    res.status(200).json({
      ok: true,
      data: userUpdate,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al actualizar el usuario",
      detalles: error.mesagge,
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  if (!idBuscado) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const userFind = await UserModel.findById(idBuscado);
    if (!userFind) {
      return res.status(404).json({
        mesagge: "el usuario con ese id no existe",
      });
    }
    const userDelete = await UserModel.delete(idBuscado);
    res
      .status(200)
      .json({ mesagge: "USUARIO eliminado con exito", user: userDelete });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al eliminar el usuario",
      detalles: error.mesagge,
    });
  }
}
