import React from 'react';
import { SuggestionsEmptyState } from './EmptyState';
import { LightbulbIcon, TrendingUp, BarChart, BookOpen, ArrowUp } from 'lucide-react';

interface StockSuggestion {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  sector: string;
  potentialReturn: number;
  confidenceScore: number;
  reason: string;
}

const mockSuggestions: StockSuggestion[] = [
  {
    id: '1',
    name: 'Bajaj Finance',
    symbol: 'BAJFINANCE',
    currentPrice: 7250.80,
    sector: 'Finance',
    potentialReturn: 12.5,
    confidenceScore: 85,
    reason: 'Strong growth in consumer lending, expansion in rural markets, and robust digital initiatives.'
  },
  {
    id: '2',
    name: 'Tata Motors',
    symbol: 'TATAMOTORS',
    currentPrice: 620.40,
    sector: 'Auto',
    potentialReturn: 18.2,
    confidenceScore: 78,
    reason: 'EV transition strategy, strong JLR performance, and improved domestic market share.'
  },
  {
    id: '3',
    name: 'Sun Pharma',
    symbol: 'SUNPHARMA',
    currentPrice: 1120.75,
    sector: 'Pharma',
    potentialReturn: 9.8,
    confidenceScore: 72,
    reason: 'Specialty products pipeline, growing US market presence, and margin expansion.'
  }
];

const Suggestions: React.FC = () => {
  const hasSuggestions = mockSuggestions.length > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  if (!hasSuggestions) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <LightbulbIcon size={24} className="text-amber-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Stock Suggestions</h1>
        </div>
        <SuggestionsEmptyState />
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex items-center mb-6">
        <LightbulbIcon size={24} className="text-amber-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Stock Suggestions</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Based on your portfolio and market trends, we recommend considering these stocks:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{suggestion.name}</h3>
                  <p className="text-sm text-gray-500">{suggestion.symbol} • {suggestion.sector}</p>
                </div>
                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                  Suggested
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Price</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(suggestion.currentPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Potential Return</p>
                  <p className="text-lg font-semibold text-green-600 flex items-center">
                    <ArrowUp size={16} className="mr-1" />
                    {suggestion.potentialReturn}%
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <p className="text-xs text-gray-500">Confidence Score</p>
                  <p className="text-xs font-medium text-gray-700">{suggestion.confidenceScore}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${suggestion.confidenceScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Why we suggest this</p>
                <p className="text-sm text-gray-700">{suggestion.reason}</p>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  <BookOpen size={16} className="mr-1" />
                  Research
                </button>
                <button className="flex-1 flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <BarChart size={16} className="mr-1" />
                  Financials
                </button>
                <button className="flex-1 flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <TrendingUp size={16} className="mr-1" />
                  Charts
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;