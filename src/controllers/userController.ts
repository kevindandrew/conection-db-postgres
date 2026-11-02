import type { Response, Request } from "express";
import { query } from "../config/db.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const { rows } = await query("SELECT * FROM users ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obetener los usuarios",
    });
  }
}

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  try {
    const text = `INSERT INTO users(name, email) VALUES ($1,$2) RETURNING *`;
    const values = [name, email];
    const { rows } = await query(text, values);
    res.status(201).json({
      mensaje: "usuario creado con exito",
      data: rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el usuario",
      detalles: error.mesagge,
    });
  }
}
