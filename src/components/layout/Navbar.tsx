import React, { useState } from 'react';
import { Menu, BellIcon, Search, X } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile search expandable */}
      <div className={`absolute top-0 left-0 right-0 bg-white z-10 transition-all duration-200 ease-in-out ${
        showSearch ? 'h-16 opacity-100' : 'h-0 opacity-0 pointer-events-none'
      } md:hidden`}>
        <div className="flex items-center h-full px-4">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search stocks..."
            className="flex-1 bg-transparent border-none outline-none text-gray-800"
          />
          <button
            onClick={() => setShowSearch(false)}
            className="ml-2 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Desktop search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-md mx-4">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search stocks, markets, or news..."
          className="bg-transparent border-none outline-none text-gray-800 w-full"
        />
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 md:hidden"
        >
          <Search size={20} />
        </button>
        
        <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
          <BellIcon size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
            RK
          </div>
          <div className="ml-2 hidden md:block">
            <p className="text-sm font-medium text-gray-700">Trial App</p>
            <p className="text-xs text-gray-500">Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;