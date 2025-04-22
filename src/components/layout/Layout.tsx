import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  activeLink: string;
  onNavigate: (link: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeLink, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`fixed inset-y-0 left-0 z-30 transition-transform transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar activeLink={activeLink} onNavigate={onNavigate} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-30 z-20 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
        <footer className="py-4 px-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 StockFolio - Indian Stock Portfolio Manager. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;