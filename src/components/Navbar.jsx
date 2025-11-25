import React from "react";
import { LogOut, Search, Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onLogout, onOpenMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    else {
      localStorage.removeItem("auth");
      localStorage.removeItem("currentProfile");
      navigate("/login");
    }
  };

  return (
    <header className="
      flex items-center justify-between 
      px-4 sm:px-6 py-3 
      bg-white dark:bg-gray-900 
      border-b border-gray-200 dark:border-gray-700 
      shadow-md
    ">
      {/* Left */}
      <div className="flex items-center gap-3">
        
        {/* Mobile Menu */}
        <button 
          onClick={onOpenMenu}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 sm:hidden"
        >
          <Menu size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Search */}
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Search size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* App Title */}
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Naturals
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        
        {/* Notifications */}
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Bell size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-1 
            px-3 py-1 rounded 
            bg-red-500 hover:bg-red-600
            text-white text-sm
          "
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
