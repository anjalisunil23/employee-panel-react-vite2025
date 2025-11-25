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
  Settings as SettingsIcon,
  Bell,
  UserCog,
  SlidersHorizontal,
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
    { name: "Settings", to: "/settings", icon: <SettingsIcon size={18} /> },
  ];

  useEffect(() => {
    try {
      const cp = JSON.parse(localStorage.getItem("currentProfile"));
      if (cp) setProfile(cp);
    } catch (e) {
      setProfile(null);
    }
  }, []);

  // ⭐ STANDARD MINIMAL DASHBOARD THEME
  const baseClasses = `
    ${collapsed ? "w-20" : "w-64"}
    h-full flex flex-col transition-all duration-300 ease-in-out
    bg-white dark:bg-gray-900
    border-r border-gray-200 dark:border-gray-800
  `;

  // ⭐ Standard NavLink design
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
     }`;

  return (
    <>
      {/* ⭐ MOBILE OVERLAY SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => onCloseMobile && onCloseMobile()}
          />

          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`${baseClasses} w-64 z-50`}
          >
            <div className="overflow-y-auto h-full p-4">
              {/* Profile Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold">
                      {profile?.name
                        ? profile.name.split(" ").map((n) => n[0]).join("")
                        : "EM"}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100">
                      {profile?.name || "Employee"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {profile?.role || "Role"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCloseMobile}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ✕
                </button>
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
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Theme
                  </span>

                  <div
                    onClick={() => onSetTheme(theme === "light" ? "dark" : "light")}
                    className={`relative w-14 h-7 rounded-full cursor-pointer 
                      ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                      }`}
                  >
                    <motion.div
                      layout
                      className="absolute top-1 left-1 w-5 h-5 bg-white dark:bg-black rounded-full flex items-center justify-center shadow"
                    >
                      {theme === "light" ? (
                        <Sun size={14} className="text-yellow-500" />
                      ) : (
                        <Moon size={14} className="text-blue-400" />
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Extra Settings */}
              <div className="mt-5 space-y-3 text-sm">
                <button className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 flex gap-2 items-center">
                  <UserCog size={16} /> Profile Settings
                </button>
                <button className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 flex gap-2 items-center">
                  <Bell size={16} /> Notification Settings
                </button>
                <button className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 flex gap-2 items-center">
                  <SlidersHorizontal size={16} /> Preferences
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      )}

      {/* ⭐ DESKTOP SIDEBAR */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${baseClasses} hidden sm:flex flex-col`}
      >
        {/* Profile */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm">
                {profile?.name
                  ? profile.name.split(" ").map((n) => n[0]).join("")
                  : "EM"}
              </div>
            )}

            {!collapsed && (
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-100">
                  {profile?.name || "Employee"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {profile?.role || "Role"}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onCollapse}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <div className="p-4">
          <div className="flex items-center justify-between mb-2 text-gray-600 dark:text-gray-300">
            Theme
          </div>

          <div
            onClick={() => onSetTheme(theme === "light" ? "dark" : "light")}
            className={`relative w-14 h-7 rounded-full cursor-pointer 
              ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
          >
            <motion.div
              layout
              className="absolute top-1 left-1 w-5 h-5 bg-white dark:bg-black rounded-full flex items-center justify-center shadow"
            >
              {theme === "light" ? (
                <Sun size={14} className="text-yellow-500" />
              ) : (
                <Moon size={14} className="text-blue-400" />
              )}
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
