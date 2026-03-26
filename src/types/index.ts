// User & Auth Types
export interface User {
  id: number;
  email: string;
  name?: string;
  role: "admin" | "user";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface AuthToken {
  email: string;
  id: number;
  role: string;
  iat: number;
  exp: number;
}

// Stock & Quote Types
export interface StockQuote {
  symbol: string;
  shortName: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  currency: string;
  marketCap?: number;
  volume?: number;
}

export interface QuotesResponse {
  success: boolean;
  data: StockQuote[];
  meta: {
    lastUpdate: string | null;
    cached: boolean;
    count: number;
  };
}

export interface CacheInfo {
  hasCache: boolean;
  lastUpdate: string | null;
  stocksCount: number;
  topStocks: string[];
  cacheTTL: number;
}

// Portfolio Types
export interface Asset {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Contribution {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  type: "buy" | "sell";
}

export interface Folder {
  id: string;
  name: string;
  assets: string[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
