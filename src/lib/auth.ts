import jwt from "jsonwebtoken";
import type { User, AuthToken } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_in_production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

/**
 * Gera um novo token JWT
 */
export function generateToken(user: Omit<User, "name">): string {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verifica e decodifica um token JWT
 */
export function verifyToken(token: string): AuthToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthToken;
    return decoded;
  } catch (error) {
    console.error("Token inválido:", (error as Error).message);
    return null;
  }
}

/**
 * Valida credenciais de login
 * TODO: Em produção, usar bcrypt e banco de dados
 */
export function validateCredentials(
  email: string,
  password: string
): User | null {
  // Validação hardcoded - substituir por consulta ao banco de dados
  if (email === "admin@gmail.com" && password === "732714") {
    return {
      id: 1,
      email,
      name: "Caio",
      role: "admin",
    };
  }
  return null;
}
