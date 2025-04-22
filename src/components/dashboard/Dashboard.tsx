import React, { useState } from 'react';
import DashboardSummary from './DashboardSummary';
import StockTable from './StockTable';
import AddStockModal from './AddStockModal';
import { Stock } from '../../types/stock';
import { calculatePortfolioSummary } from '../../data/mockStocks';
import { PlusCircle } from 'lucide-react';

interface DashboardProps {
  stocks: Stock[];
  onAddStock: (stock: Stock) => void;
  onDeleteStock: (id: string) => void;
  onUpdateStock: (updatedStock: Stock) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  stocks,
  onAddStock,
  onDeleteStock,
  onUpdateStock
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockToEdit, setStockToEdit] = useState<Stock | null>(null);
  
  const portfolioSummary = calculatePortfolioSummary(stocks);

  const handleAddStock = () => {
    setStockToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditStock = (stock: Stock) => {
    setStockToEdit(stock);
    setIsModalOpen(true);
  };

  const handleDeleteStock = (id: string) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      onDeleteStock(id);
    }
  };

  const handleSaveStock = (stock: Stock) => {
    if (stockToEdit) {
      onUpdateStock(stock);
    } else {
      onAddStock(stock);
    }
  };

  return (
    <div className="animate-fadeIn">
      <DashboardSummary summary={portfolioSummary} />
      
      <div className="mt-8 flex justify-between items-center">
        <StockTable
          stocks={stocks}
          onEdit={handleEditStock}
          onDelete={handleDeleteStock}
        />
      </div>

      <button
        onClick={handleAddStock}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusCircle size={24} />
      </button>

      <AddStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStock={handleSaveStock}
        stockToEdit={stockToEdit}
      />
    </div>
  );
};

export default Dashboard;