import Brapi from "brapi";
import type { StockQuote, CacheInfo } from "@/types";

const BRAPI_API_KEY = process.env.BRAPI_API_KEY || "";
const CACHE_TTL = parseInt(process.env.CACHE_TTL || "900000"); // 15 minutos padrão

// Cliente Brapi
const client = new Brapi({
  apiKey: BRAPI_API_KEY,
  environment: "production",
  maxRetries: 2,
  timeout: 60000,
});

// Cache em memória
let cachedQuotes: StockQuote[] | null = null;
let cachedTopStocks: string[] | null = null;
let lastUpdate: Date | null = null;

/**
 * Busca as top 15 ações mais negociadas do dia
 * Retorna array de símbolos (tickers)
 */
async function getTop15MostTradedStocks(): Promise<string[]> {
  try {
    const response = await client.quote.list({
      sortBy: "volume",
      sortOrder: "desc",
      limit: 15,
    });

    if (response && response.stocks && response.stocks.length > 0) {
      const topStocks = response.stocks.map((stock) => stock.stock);
      cachedTopStocks = topStocks;
      return topStocks;
    }

    // Fallback para lista padrão se a API falhar
    return getFallbackStocks();
  } catch (error) {
    console.error("Erro ao buscar top 15 ações:", (error as Error).message);
    return getFallbackStocks();
  }
}

/**
 * Lista padrão de ações (fallback)
 */
function getFallbackStocks(): string[] {
  return [
    "PETR4",
    "VALE3",
    "ITUB4",
    "BBDC4",
    "ABEV3",
    "B3SA3",
    "WEGE3",
    "RENT3",
    "SUZB3",
    "BBAS3",
    "ELET3",
    "CMIG4",
    "ITSA4",
    "POMO4",
    "BBSE3",
  ];
}

/**
 * Busca cotações das ações
 */
async function fetchQuotes(stocks: string[]): Promise<StockQuote[]> {
  try {
    const promises = stocks.map((ticker) =>
      client.quote.retrieve(ticker).catch((err) => {
        console.error(`Erro ao buscar ${ticker}:`, err.message);
        return null;
      })
    );

    const results = await Promise.all(promises);

    const quotes: StockQuote[] = results
      .filter((quote) => quote && quote.results && quote.results[0])
      .map((quote) => {
        const data = quote!.results[0];
        return {
          symbol: data.symbol,
          shortName: data.shortName || data.symbol,
          regularMarketPrice: data.regularMarketPrice,
          regularMarketChange: data.regularMarketChange,
          regularMarketChangePercent: data.regularMarketChangePercent,
          regularMarketTime: data.regularMarketTime,
          currency: data.currency || "BRL",
          marketCap: data.marketCap,
          volume: data.regularMarketVolume,
        };
      });

    return quotes;
  } catch (error) {
    console.error("Erro ao buscar cotações:", (error as Error).message);
    throw error;
  }
}

/**
 * Atualiza o cache de cotações
 */
export async function updateQuotesCache(): Promise<{
  success: boolean;
  quotes?: StockQuote[];
  lastUpdate?: Date;
  error?: string;
}> {
  try {
    console.log("[QuotesService] Atualizando cache de cotações...");

    // Busca top 15 mais negociadas
    const topStocks = await getTop15MostTradedStocks();

    // Busca cotações
    const quotes = await fetchQuotes(topStocks);

    // Atualiza cache
    cachedQuotes = quotes;
    lastUpdate = new Date();

    console.log(
      `[QuotesService] Cache atualizado com ${quotes.length} ações às ${lastUpdate.toLocaleString("pt-BR")}`
    );

    return {
      success: true,
      quotes,
      lastUpdate,
    };
  } catch (error) {
    console.error(
      "[QuotesService] Erro ao atualizar cache:",
      (error as Error).message
    );
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

/**
 * Retorna cotações do cache ou busca novas se cache expirou
 */
export async function getQuotes(
  forceRefresh = false
): Promise<{
  quotes: StockQuote[];
  lastUpdate: string | null;
  cached: boolean;
}> {
  const now = Date.now();
  const cacheExpired =
    !lastUpdate || now - lastUpdate.getTime() > CACHE_TTL;

  if (forceRefresh || cacheExpired || !cachedQuotes) {
    await updateQuotesCache();
  }

  return {
    quotes: cachedQuotes || [],
    lastUpdate: lastUpdate ? lastUpdate.toISOString() : null,
    cached: !forceRefresh && !cacheExpired,
  };
}

/**
 * Retorna informações do cache
 */
export function getCacheInfo(): CacheInfo {
  return {
    hasCache: !!cachedQuotes,
    lastUpdate: lastUpdate ? lastUpdate.toISOString() : null,
    stocksCount: cachedQuotes ? cachedQuotes.length : 0,
    topStocks: cachedTopStocks || [],
    cacheTTL: CACHE_TTL,
  };
}
