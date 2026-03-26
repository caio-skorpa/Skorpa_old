import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, generateToken } from "@/lib/auth";
import type { LoginRequest, LoginResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email e senha são obrigatórios",
        } as LoginResponse,
        { status: 400 }
      );
    }

    // Valida credenciais
    const user = validateCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "E-mail ou senha incorretos",
        } as LoginResponse,
        { status: 401 }
      );
    }

    // Gera token JWT
    const token = generateToken(user);

    return NextResponse.json(
      {
        success: true,
        message: "Login realizado com sucesso",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      } as LoginResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      } as LoginResponse,
      { status: 500 }
    );
  }
}
