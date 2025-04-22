import React from 'react';
import { TrendingUp, BookOpen, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <AlertCircle size={48} className="text-gray-400" />,
  action
}) => {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export const WatchlistEmptyState: React.FC<{ onAddToWatchlist: () => void }> = ({ onAddToWatchlist }) => (
  <EmptyState
    title="Your watchlist is empty"
    description="Add stocks to your watchlist to monitor their performance without adding them to your portfolio."
    icon={<BookOpen size={48} className="text-gray-400" />}
    action={{
      label: "Add to Watchlist",
      onClick: onAddToWatchlist
    }}
  />
);

export const SuggestionsEmptyState: React.FC = () => (
  <EmptyState
    title="No stock suggestions yet"
    description="Add more stocks to your portfolio to get personalized stock suggestions based on your investment patterns."
    icon={<TrendingUp size={48} className="text-gray-400" />}
  />
);

export default EmptyState;