import React from 'react';
import { 
  BarChart3, 
  PlusCircle, 
  Eye, 
  Bell, 
  LightbulbIcon, 
  Settings, 
  LogOut, 
  TrendingUp 
} from 'lucide-react';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 mb-1 rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-indigo-100 text-indigo-800'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
      {active && (
        <span className="ml-auto w-1.5 h-6 rounded-full bg-indigo-600"></span>
      )}
    </button>
  );
};

interface SidebarProps {
  activeLink: string;
  onNavigate: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink, onNavigate }) => {
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'add-stock', label: 'Add Stock', icon: <PlusCircle size={20} /> },
    { id: 'watchlist', label: 'Watchlist', icon: <Eye size={20} /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell size={20} /> },
    { id: 'suggestions', label: 'Suggestions', icon: <LightbulbIcon size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <TrendingUp size={28} className="text-indigo-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">StockFolio</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Indian Stock Portfolio Manager</p>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Main Menu</p>
        <nav>
          {links.map((link) => (
            <SidebarLink
              key={link.id}
              icon={link.icon}
              label={link.label}
              active={activeLink === link.id}
              onClick={() => onNavigate(link.id)}
            />
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <SidebarLink
          icon={<Settings size={20} />}
          label="Settings"
          onClick={() => onNavigate('settings')}
        />
        <SidebarLink
          icon={<LogOut size={20} />}
          label="Logout"
          onClick={() => alert('Logout clicked')}
        />
      </div>
    </div>
  );
};

export default Sidebar;