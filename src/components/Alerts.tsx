import React, { useState } from 'react';
import { Bell, Plus, Trash2, Check } from 'lucide-react';

interface StockAlert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  active: boolean;
  createdAt: string;
}

const initialAlerts: StockAlert[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    condition: 'above',
    price: 2500,
    active: true,
    createdAt: '2025-04-02T10:30:00Z'
  },
  {
    id: '2',
    symbol: 'INFY',
    condition: 'below',
    price: 1500,
    active: true,
    createdAt: '2025-04-05T14:20:00Z'
  },
  {
    id: '3',
    symbol: 'HDFCBANK',
    condition: 'above',
    price: 1700,
    active: false,
    createdAt: '2025-04-08T09:15:00Z'
  }
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>(initialAlerts);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState<Omit<StockAlert, 'id' | 'createdAt'>>({
    symbol: '',
    condition: 'above',
    price: 0,
    active: true
  });

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    
    const alert: StockAlert = {
      ...newAlert,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setAlerts([...alerts, alert]);
    setNewAlert({
      symbol: '',
      condition: 'above',
      price: 0,
      active: true
    });
    setShowForm(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(
      alerts.map(alert => 
        alert.id === id 
          ? { ...alert, active: !alert.active } 
          : alert
      )
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Bell size={24} className="text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Price Alerts</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={18} className="mr-1" />
          New Alert
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create Price Alert</h3>
          <form onSubmit={handleAddAlert}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Symbol
                </label>
                <input
                  type="text"
                  id="symbol"
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value.toUpperCase() })}
                  placeholder="e.g. RELIANCE"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  id="condition"
                  value={newAlert.condition}
                  onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as 'above' | 'below' })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="above">Price Above</option>
                  <option value="below">Price Below</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  value={newAlert.price || ''}
                  onChange={(e) => setNewAlert({ ...newAlert, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  step="0.01"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Alert
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Trigger
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{alert.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        Price {alert.condition === 'above' ? 'goes above' : 'falls below'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(alert.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(alert.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          alert.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {alert.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleAlertStatus(alert.id)}
                        className={`${
                          alert.active ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'
                        } mr-3`}
                        title={alert.active ? 'Deactivate' : 'Activate'}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No alerts set. Create one to get notified about price movements.
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

export default Alerts;