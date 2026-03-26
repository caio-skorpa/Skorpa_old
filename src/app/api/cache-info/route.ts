import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getCacheInfo } from "@/lib/services/quotes.service";

export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Acesso negado. Token não fornecido." },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Token inválido ou expirado." },
        { status: 403 }
      );
    }

    // Retorna info do cache
    const info = getCacheInfo();

    return NextResponse.json(
      {
        success: true,
        data: info,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar info do cache:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar informações do cache",
      },
      { status: 500 }
    );
  }
}
