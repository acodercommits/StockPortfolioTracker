import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, DollarSign, Percent, AlertTriangle } from 'lucide-react';
import { PortfolioSummary } from '../../types/stock';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
  bgColor?: string;
  textColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  change,
  positive,
  bgColor = 'bg-white',
  textColor = 'text-gray-700'
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-4 border border-gray-100 transition-transform duration-200 hover:shadow-md hover:-translate-y-1`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className={`text-xl font-bold mt-1 ${textColor}`}>{value}</h3>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
              {positive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${positive ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface DashboardSummaryProps {
  summary: PortfolioSummary;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ summary }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <SummaryCard
          title="Portfolio Value"
          value={formatCurrency(summary.totalValue)}
          icon={<DollarSign size={20} />}
          change={formatCurrency(summary.todayGain)}
          positive={summary.todayGain > 0}
        />
        
        <SummaryCard
          title="Total Investment"
          value={formatCurrency(summary.invested)}
          icon={<BarChart2 size={20} />}
        />
        
        <SummaryCard
          title="Total Gain/Loss"
          value={formatCurrency(summary.totalGain)}
          icon={<Percent size={20} />}
          change={formatPercentage(summary.totalGainPercentage)}
          positive={summary.totalGain > 0}
          bgColor={summary.totalGain > 0 ? 'bg-green-50' : 'bg-red-50'}
          textColor={summary.totalGain > 0 ? 'text-green-700' : 'text-red-700'}
        />
        
        <SummaryCard
          title="Holdings"
          value={summary.stockCount.toString()}
          icon={<AlertTriangle size={20} />}
          bgColor="bg-indigo-50"
          textColor="text-indigo-700"
        />
      </div>

      {/* Market status indicator */}
      <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Market Status:</span> Open • BSE Sensex: 80,245.30 <span className="text-green-500">+420.34 (0.53%)</span> • Nifty 50: 24,268.40 <span className="text-green-500">+128.25 (0.53%)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;