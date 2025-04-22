import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AddStockFormData, Stock } from '../../types/stock';
import { v4 as uuidv4 } from 'uuid';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stock: Stock) => void;
  stockToEdit: Stock | null;
}

const initialFormData: AddStockFormData = {
  name: '',
  symbol: '',
  purchasePrice: 0,
  currentPrice: 0,
  quantity: 0,
  sector: '',
  targetPrice: 0,
  stopLoss: 0
};

const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  onAddStock,
  stockToEdit
}) => {
  const [formData, setFormData] = useState<AddStockFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof AddStockFormData, string>>>({});

  useEffect(() => {
    if (stockToEdit) {
      setFormData({
        name: stockToEdit.name,
        symbol: stockToEdit.symbol,
        purchasePrice: stockToEdit.purchasePrice,
        currentPrice: stockToEdit.currentPrice,
        quantity: stockToEdit.quantity,
        sector: stockToEdit.sector,
        targetPrice: stockToEdit.targetPrice,
        stopLoss: stockToEdit.stopLoss
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [stockToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (['purchasePrice', 'currentPrice', 'quantity', 'targetPrice', 'stopLoss'].includes(name)) {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field changes
    if (errors[name as keyof AddStockFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddStockFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Stock name is required';
    }
    
    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Stock symbol is required';
    }
    
    if (formData.purchasePrice <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }
    
    if (formData.currentPrice <= 0) {
      newErrors.currentPrice = 'Current price must be greater than 0';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than a 0';
    }
    
    if (!formData.sector.trim()) {
      newErrors.sector = 'Sector is required';
    }
    
    if (formData.targetPrice <= 0) {
      newErrors.targetPrice = 'Target price must be greater than 0';
    }
    
    if (formData.stopLoss <= 0) {
      newErrors.stopLoss = 'Stop loss must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const newStock: Stock = {
      id: stockToEdit?.id || uuidv4(),
      ...formData,
      lastUpdated: new Date().toISOString()
    };
    
    onAddStock(newStock);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {stockToEdit ? 'Edit Stock' : 'Add New Stock'}
              </h3>
              <button
                onClick={onClose}
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Stock Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                    Stock Symbol
                  </label>
                  <input
                    type="text"
                    name="symbol"
                    id="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.symbol ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.symbol && <p className="mt-1 text-sm text-red-600">{errors.symbol}</p>}
                </div>
                
                <div>
                  <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
                    Purchase Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="purchasePrice"
                    id="purchasePrice"
                    value={formData.purchasePrice || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.purchasePrice ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.purchasePrice && <p className="mt-1 text-sm text-red-600">{errors.purchasePrice}</p>}
                </div>
                
                <div>
                  <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
                    Current Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="currentPrice"
                    id="currentPrice"
                    value={formData.currentPrice || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.currentPrice ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.currentPrice && <p className="mt-1 text-sm text-red-600">{errors.currentPrice}</p>}
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.quantity ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                </div>
                
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                    Sector
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.sector ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  >
                    <option value="">Select a sector</option>
                    <option value="IT">IT</option>
                    <option value="Banking">Banking</option>
                    <option value="FMCG">FMCG</option>
                    <option value="Pharma">Pharma</option>
                    <option value="Auto">Auto</option>
                    <option value="Oil & Gas">Oil & Gas</option>
                    <option value="Telecom">Telecom</option>
                    <option value="Construction">Construction</option>
                    <option value="Metal">Metal</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
                </div>
                
                <div>
                  <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700">
                    Target Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="targetPrice"
                    id="targetPrice"
                    value={formData.targetPrice || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.targetPrice ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.targetPrice && <p className="mt-1 text-sm text-red-600">{errors.targetPrice}</p>}
                </div>
                
                <div>
                  <label htmlFor="stopLoss" className="block text-sm font-medium text-gray-700">
                    Stop Loss (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="stopLoss"
                    id="stopLoss"
                    value={formData.stopLoss || ''}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.stopLoss ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.stopLoss && <p className="mt-1 text-sm text-red-600">{errors.stopLoss}</p>}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {stockToEdit ? 'Update Stock' : 'Add Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;