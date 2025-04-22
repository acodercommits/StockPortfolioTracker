import { Stock, PortfolioSummary } from '../types/stock';
import { v4 as uuidv4 } from 'uuid';

export const stocks: Stock[] = [
  {
    id: uuidv4(),
    name: 'Reliance Industries',
    symbol: 'RELIANCE',
    currentPrice: 2451.8,
    purchasePrice: 2100.5,
    quantity: 10,
    sector: 'Oil & Gas',
    targetPrice: 2700,
    stopLoss: 2000,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Infosys',
    symbol: 'INFY',
    currentPrice: 1560.2,
    purchasePrice: 1600.0,
    quantity: 15,
    sector: 'IT',
    targetPrice: 1800,
    stopLoss: 1400,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'HDFC Bank',
    symbol: 'HDFCBANK',
    currentPrice: 1680.5,
    purchasePrice: 1520.75,
    quantity: 8,
    sector: 'Banking',
    targetPrice: 1850,
    stopLoss: 1500,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Tata Consultancy Services',
    symbol: 'TCS',
    currentPrice: 3520.3,
    purchasePrice: 3400.0,
    quantity: 5,
    sector: 'IT',
    targetPrice: 3800,
    stopLoss: 3200,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Hindustan Unilever',
    symbol: 'HINDUNILVR',
    currentPrice: 2350.0,
    purchasePrice: 2400.5,
    quantity: 7,
    sector: 'FMCG',
    targetPrice: 2550,
    stopLoss: 2250,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Bharti Airtel',
    symbol: 'BHARTIARTL',
    currentPrice: 875.3,
    purchasePrice: 750.0,
    quantity: 20,
    sector: 'Telecom',
    targetPrice: 950,
    stopLoss: 800,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'ITC Limited',
    symbol: 'ITC',
    currentPrice: 415.6,
    purchasePrice: 375.8,
    quantity: 50,
    sector: 'FMCG',
    targetPrice: 450,
    stopLoss: 380,
    lastUpdated: '2025-04-10T09:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Larsen & Toubro',
    symbol: 'LT',
    currentPrice: 2560.75,
    purchasePrice: 2300.0,
    quantity: 6,
    sector: 'Construction',
    targetPrice: 2800,
    stopLoss: 2200,
    lastUpdated: '2025-04-10T09:30:00Z'
  }
];

export const calculatePortfolioSummary = (stocks: Stock[]): PortfolioSummary => {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.currentPrice * stock.quantity, 0);
  const invested = stocks.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0);
  const totalGain = totalValue - invested;
  const totalGainPercentage = (totalGain / invested) * 100;
  
  // Simulated today's gain (would be calculated from previous day close in real app)
  const todayGain = totalValue * 0.005; // 0.5% daily change as placeholder
  
  return {
    totalValue,
    invested,
    todayGain,
    totalGain,
    totalGainPercentage,
    stockCount: stocks.length
  };
};

export const portfolioSummary: PortfolioSummary = calculatePortfolioSummary(stocks);