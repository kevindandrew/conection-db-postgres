import type { Response, Request } from "express";
import { UserModel } from "../models/userModel.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserModel.findAll();
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
  if (!name || !email) {
    return res.status(400).json({ error: "faltan datos obligatorios" });
  }
  try {
    const userExist = await UserModel.findByEmail(email);
    if (userExist) {
      return res
        .status(404)
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
