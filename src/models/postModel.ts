import { query } from "../config/db.js";

export const PostModel = {
  async findAll() {
    const { rows } = await query("SELECT * FROM posts ORDER BY id ASC");
    console.log(rows);
    return rows;
  },
};
