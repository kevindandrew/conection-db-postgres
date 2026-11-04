import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "el nombre debe tener almenos 2 caracteres")
    .max(100, "el nombre no puede superar los 100 caracteres"),
  email: z.string().email("el formato del email no es valido"),
});

export const updateUserSchema = createUserSchema.partial();
// extraer el tipo de dato para typescript desde el schema q creamos
export type CreateUserInput = z.infer<typeof createUserSchema>;
