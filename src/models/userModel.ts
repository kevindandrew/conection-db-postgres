import { query } from "../config/db.js";

//modelo para la tabla de "users"
export const UserModel = {
  async findAll(filters: {
    name?: string | undefined;
    email?: string | undefined;
    limit?: number | undefined;
  }) {
    let sqlBase = "SELECT * FROM users WHERE 1=1";
    const values = [];
    let paramIndex = 1;

    if (filters.name) {
      sqlBase += ` AND name LIKE $${paramIndex}`;
      values.push(`%${filters.name}%`);
      paramIndex++;
    }
    if (filters.email) {
      sqlBase += ` AND email LIKE $${paramIndex}`;
      values.push(`%${filters.email}%`);
      paramIndex++;
    }
    sqlBase += " ORDER BY id ASC";

    if (filters.limit) {
      sqlBase += ` LIMIT $${paramIndex}`;
      values.push(filters.limit);
      paramIndex++;
    }

    const { rows } = await query(sqlBase, values);
    return rows;
  },
  async findById(id: number) {
    const { rows } = await query("SELECT * FROM users WHERE id=$1", [id]);
    return rows[0]; // retorna el usuario encontrado o undefined
  },
  async create(name: string, email: string) {
    const text = "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *";
    const { rows } = await query(text, [name, email]);
    return rows[0];
  },
  async findByEmail(email: string) {
    const { rows } = await query("SELECT * FROM users WHERE email=$1", [email]);
    return rows[0];
  },
  async update(id: number, name?: string, email?: string) {
    const text = `
    UPDATE users
    SET name = COALESCE ($1,name),
        email = COALESCE ($2,email)
    WHERE id = $3
    RETURNING *
    `;
    const { rows } = await query(text, [name || null, email || null, id]);
    return rows[0];
  },
  async delete(id: number) {
    const text = "DELETE FROM users WHERE id = $1 RETURNING *";
    const { rows } = await query(text, [id]);
    return rows[0];
  },
};
