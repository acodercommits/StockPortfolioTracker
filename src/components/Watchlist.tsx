import React from 'react';
import { WatchlistEmptyState } from './EmptyState';
import { Eye, ArrowUp, ArrowDown } from 'lucide-react';

interface WatchlistStock {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
}

const mockWatchlist: WatchlistStock[] = [
  {
    id: '1',
    name: 'HDFC AMC',
    symbol: 'HDFCAMC',
    currentPrice: 3250.40,
    dayChange: 45.60,
    dayChangePercent: 1.42
  },
  {
    id: '2',
    name: 'Titan Company',
    symbol: 'TITAN',
    currentPrice: 3420.75,
    dayChange: -22.30,
    dayChangePercent: -0.65
  },
  {
    id: '3',
    name: 'Asian Paints',
    symbol: 'ASIANPAINT',
    currentPrice: 3125.20,
    dayChange: 15.80,
    dayChangePercent: 0.51
  }
];

interface WatchlistProps {
  onAddToWatchlist: () => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ onAddToWatchlist }) => {
  const hasWatchlistItems = mockWatchlist.length > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  if (!hasWatchlistItems) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Eye size={24} className="text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Watchlist</h1>
        </div>
        <WatchlistEmptyState onAddToWatchlist={onAddToWatchlist} />
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Eye size={24} className="text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Watchlist</h1>
        </div>
        <button
          onClick={onAddToWatchlist}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Watchlist
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day Change
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockWatchlist.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                        <div className="text-sm text-gray-500">{stock.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(stock.currentPrice)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${stock.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.dayChange >= 0 ? (
                        <ArrowUp size={14} className="mr-1" />
                      ) : (
                        <ArrowDown size={14} className="mr-1" />
                      )}
                      <span>{formatCurrency(Math.abs(stock.dayChange))}</span>
                      <span className="ml-1">({Math.abs(stock.dayChangePercent).toFixed(2)}%)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Add to Portfolio
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;