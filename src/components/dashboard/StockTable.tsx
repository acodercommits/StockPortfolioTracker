import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Search, Trash2, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import { Stock, StockStatus } from '../../types/stock';

interface StockTableProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (id: string) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Stock>('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getStockStatus = (stock: Stock): StockStatus => {
    if (stock.currentPrice > stock.purchasePrice) return 'profit';
    if (stock.currentPrice < stock.purchasePrice) return 'loss';
    return 'neutral';
  };

  const getStatusColor = (status: StockStatus): string => {
    switch (status) {
      case 'profit':
        return 'text-green-600 bg-green-100';
      case 'loss':
        return 'text-red-600 bg-red-100';
      case 'neutral':
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (stock: Stock): string => {
    const percentChange = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
    const formattedChange = percentChange.toFixed(2);
    return `${formattedChange}%`;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  const handleSort = (field: keyof Stock) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredStocks = sortedStocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSortIcon = (field: keyof Stock) => {
    if (field !== sortField) return <ArrowUpDown size={14} />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Portfolio</h2>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stock</span>
                    {renderSortIcon('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('currentPrice')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Current Price</span>
                    {renderSortIcon('currentPrice')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('purchasePrice')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Purchase Price</span>
                    {renderSortIcon('purchasePrice')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Quantity</span>
                    {renderSortIcon('quantity')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('targetPrice')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Target</span>
                    {renderSortIcon('targetPrice')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => {
                  const status = getStockStatus(stock);
                  const statusColor = getStatusColor(status);
                  return (
                    <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <span>{stock.symbol}</span>
                              <span className="mx-1">•</span>
                              <span>{stock.sector}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(stock.currentPrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(stock.purchasePrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {stock.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(stock.targetPrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                          {status === 'profit' ? <ArrowUp size={12} className="mr-1" /> : 
                           status === 'loss' ? <ArrowDown size={12} className="mr-1" /> : null}
                          {getStatusText(stock)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onEdit(stock)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(stock.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {searchTerm ? 'No stocks found matching your search.' : 'No stocks in your portfolio yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTable;