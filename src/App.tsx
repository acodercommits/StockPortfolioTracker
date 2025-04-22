import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Watchlist from './components/Watchlist';
import Alerts from './components/Alerts';
import Suggestions from './components/Suggestions';
import AddStockModal from './components/dashboard/AddStockModal';
import { Stock } from './types/stock';
import { stocks as initialStocks } from './data/mockStocks';

function App() {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  useEffect(() => {
    // If "add-stock" is selected, open the modal and revert to dashboard
    if (activeLink === 'add-stock') {
      setIsAddStockModalOpen(true);
      setActiveLink('dashboard');
    }
  }, [activeLink]);

  const handleAddStock = (newStock: Stock) => {
    setStocks([...stocks, newStock]);
  };

  const handleUpdateStock = (updatedStock: Stock) => {
    setStocks(
      stocks.map((stock) => (stock.id === updatedStock.id ? updatedStock : stock))
    );
  };

  const handleDeleteStock = (id: string) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'dashboard':
        return (
          <Dashboard
            stocks={stocks}
            onAddStock={handleAddStock}
            onUpdateStock={handleUpdateStock}
            onDeleteStock={handleDeleteStock}
          />
        );
      case 'watchlist':
        return <Watchlist onAddToWatchlist={() => setIsAddStockModalOpen(true)} />;
      case 'alerts':
        return <Alerts />;
      case 'suggestions':
        return <Suggestions />;
      default:
        return <Dashboard 
          stocks={stocks} 
          onAddStock={handleAddStock}
          onUpdateStock={handleUpdateStock}
          onDeleteStock={handleDeleteStock}
        />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Layout activeLink={activeLink} onNavigate={setActiveLink}>
        {renderContent()}
      </Layout>

      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onAddStock={handleAddStock}
        stockToEdit={null}
      />
    </div>
  );
}

export default App;