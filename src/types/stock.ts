export interface Stock {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  purchasePrice: number;
  quantity: number;
  sector: string;
  targetPrice: number;
  stopLoss: number;
  lastUpdated: string;
}

export interface PortfolioSummary {
  totalValue: number;
  invested: number;
  todayGain: number;
  totalGain: number;
  totalGainPercentage: number;
  stockCount: number;
}

export type StockStatus = 'profit' | 'loss' | 'neutral';

export interface AddStockFormData {
  name: string;
  symbol: string;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  sector: string;
  targetPrice: number;
  stopLoss: number;
}