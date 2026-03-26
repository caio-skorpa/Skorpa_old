import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getQuotes } from "@/lib/services/quotes.service";
import type { QuotesResponse } from "@/types";

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

    // Busca cotações
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    const quotes = await getQuotes(forceRefresh);

    return NextResponse.json(
      {
        success: true,
        data: quotes.quotes,
        meta: {
          lastUpdate: quotes.lastUpdate,
          cached: quotes.cached,
          count: quotes.quotes.length,
        },
      } as QuotesResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar cotações",
      },
      { status: 500 }
    );
  }
}
