import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  Briefcase,
  CalendarRange,
  PackageSearch,
  Package,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Sidebar({
  collapsed,
  onCollapse,
  onNavigate,
  theme,
  onSetTheme,
  mobileOpen,
  onCloseMobile,
}) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const menu = [
    { name: "Dashboard", to: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Attendance", to: "/attendance", icon: <CalendarCheck size={18} /> },
    { name: "Appointments", to: "/appointments", icon: <ClipboardList size={18} /> },
    { name: "Tasks", to: "/tasks", icon: <Briefcase size={18} /> },
    { name: "Leave Management", to: "/leave", icon: <CalendarRange size={18} /> },
    { name: "Inventory Requests", to: "/inventory", icon: <PackageSearch size={18} /> },
    { name: "Products & Services", to: "/products", icon: <Package size={18} /> },
  ];

  // Load Profile
  useEffect(() => {
    try {
      const cp = JSON.parse(localStorage.getItem("currentProfile"));
      if (cp) setProfile(cp);
    } catch {
      setProfile(null);
    }
  }, []);

  // Base styling
  const baseClasses = `
    ${collapsed ? "w-20" : "w-64"}
    h-full flex flex-col transition-all duration-300 ease-in-out
    bg-gray-900 text-white
    border-r border-gray-800
  `;

  // Menu button classes
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors
     ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <>
      {/* 🌙 MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onCloseMobile && onCloseMobile()}
          />

          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`${baseClasses} w-64 z-50`}
          >
            <div className="overflow-y-auto h-full p-4">

              {/* Profile with Close Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onCloseMobile}
                    className="p-2 -ml-2 rounded-full hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm">
                      {profile?.name
                        ? profile.name.split(" ").map((n) => n[0]).join("")
                        : "EM"}
                    </div>

                    <div>
                      <div className="font-medium text-white">
                        {profile?.name || "Employee"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {profile?.role || "Role"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <nav className="mt-5 space-y-1">
                {menu.map((m) => (
                  <NavLink
                    key={m.to}
                    to={m.to}
                    onClick={onCloseMobile}
                    className={menuClass}
                  >
                    {m.icon}
                    <span>{m.name}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Theme Toggle */}
              <div className="mt-6 border-t border-gray-800 pt-4">
                <div className="flex items-center justify-between text-gray-300">
                  Theme
                </div>

                <div
                  onClick={() => onSetTheme(theme === "light" ? "dark" : "light")}
                  className={`relative w-14 h-7 rounded-full cursor-pointer mt-2
                    ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
                >
                  <motion.div
                    layout
                    className="absolute top-1 left-1 w-5 h-5 bg-black rounded-full flex items-center justify-center shadow"
                  >
                    {theme === "light" ? (
                      <Sun size={14} className="text-yellow-400" />
                    ) : (
                      <Moon size={14} className="text-blue-300" />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}

      {/* 🌙 DESKTOP SIDEBAR */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${baseClasses} hidden sm:flex flex-col`}
      >
        {/* Profile */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm">
              {profile?.name
                ? profile.name.split(" ").map((n) => n[0]).join("")
                : "EM"}
            </div>

            {!collapsed && (
              <div>
                <div className="font-medium text-white">
                  {profile?.name || "Employee"}
                </div>
                <div className="text-xs text-gray-400">
                  {profile?.role || "Role"}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onCollapse}
            className="p-2 rounded hover:bg-gray-800"
          >
            <ChevronLeft size={18} className={collapsed ? "rotate-180" : ""} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menu.map((m) => (
            <NavLink key={m.to} to={m.to} className={menuClass}>
              {m.icon}
              {!collapsed && <span>{m.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-gray-300 mb-2">
            Theme
          </div>

          <div
            onClick={() => onSetTheme(theme === "light" ? "dark" : "light")}
            className={`relative w-14 h-7 rounded-full cursor-pointer
              ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
          >
            <motion.div
              layout
              className="absolute top-1 left-1 w-5 h-5 bg-black rounded-full flex items-center justify-center shadow"
            >
              {theme === "light" ? (
                <Sun size={14} className="text-yellow-400" />
              ) : (
                <Moon size={14} className="text-blue-300" />
              )}
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
