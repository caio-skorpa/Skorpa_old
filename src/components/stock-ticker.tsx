"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { StockQuote } from "@/types";

export function StockTicker() {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("/api/quotes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuotes(data.data);
        }
      } catch (error) {
        console.error("Erro ao buscar cotações:", error);
      }
    };

    fetchQuotes();
    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (quotes.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t overflow-hidden h-16">
      <div className="flex animate-marquee space-x-8 py-4">
        {/* Duplica os items para efeito contínuo */}
        {[...quotes, ...quotes].map((quote, index) => (
          <div
            key={`${quote.symbol}-${index}`}
            className="flex items-center gap-3 whitespace-nowrap px-4"
          >
            <span className="font-semibold">{quote.symbol}</span>
            <span
              className={
                quote.regularMarketChangePercent >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formatPercent(quote.regularMarketChangePercent)}
            </span>
            <span className="text-muted-foreground">
              {formatCurrency(quote.regularMarketPrice)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
