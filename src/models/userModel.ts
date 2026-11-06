import { query } from "../config/db.js";

//modelo para la tabla de "users"
export const UserModel = {
  async findAll(filters: {
    name?: string | undefined;
    email?: string | undefined;
    page: number;
    limit: number;
  }) {
    const { name, email, page, limit } = filters;

    let sqlBase = "WHERE 1=1";
    const values: any[] = [];
    let paramIndex = 1;

    if (name) {
      sqlBase += ` AND name LIKE $${paramIndex}`;
      values.push(`%${name}%`);
      paramIndex++;
    }
    if (email) {
      sqlBase += ` AND email LIKE $${paramIndex}`;
      values.push(`%${email}%`);
      paramIndex++;
    }

    const countQuery = `SELECT COUNT(*) FROM users ${sqlBase}`;
    const countResult = await query(countQuery, values);
    const totalItem = parseInt(countResult.rows[0].count, 10);

    const offset = (page - 1) * limit;
    let dataQuery = `SELECT * FROM users ${sqlBase} ORDER BY id ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    const queryValues = [...values, limit, offset];
    const { rows } = await query(dataQuery, queryValues);
    return {
      data: rows,
      pagination: {
        totalItem,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalItem / limit),
      },
    };
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
