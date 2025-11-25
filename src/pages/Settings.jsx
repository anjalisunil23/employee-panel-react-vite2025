import React, { useEffect, useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="transition-colors duration-500 p-4 md:p-6 space-y-6 max-w-3xl mx-auto 
      bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      {/* APPEARANCE */}
      <div className="p-4 md:p-5 bg-white dark:bg-gray-800 rounded-2xl shadow 
        border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Appearance
        </h2>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow 
              peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>

        <p className="text-xs text-gray-500">Switch between light and dark theme.</p>
      </div>

      {/* PROFILE SETTINGS */}
      <div className="p-4 md:p-5 bg-white dark:bg-gray-800 rounded-2xl shadow 
        border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Profile Settings
        </h2>

        <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <li className="flex items-center justify-between">
            Update your name & email
          </li>
          <li className="flex items-center justify-between">
            Change your password
          </li>
          <li className="flex items-center justify-between">
            Upload profile photo
          </li>
        </ul>
      </div>

      {/* NOTIFICATIONS */}
      <div className="p-4 md:p-5 bg-white dark:bg-gray-800 rounded-2xl shadow 
        border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Notifications
        </h2>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700 dark:text-gray-300">
            Enable Notifications
          </span>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-all"></div>
            <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow 
              peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>

        <p className="text-xs text-gray-500">
          Receive alerts for leaves, tasks, and appointments.
        </p>
      </div>

      {/* APP PREFERENCES */}
      <div className="p-4 md:p-5 bg-white dark:bg-gray-800 rounded-2xl shadow 
        border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          App Preferences
        </h2>

        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700 dark:text-gray-300">
            Auto-update App
          </span>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoUpdates}
              onChange={() => setAutoUpdates(!autoUpdates)}
            />
            <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-purple-600 transition-all"></div>
            <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow 
              peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>

        <p className="text-xs text-gray-500">
          Automatically fetch latest version updates.
        </p>
      </div>

      {/* FOOTER */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        App Version: <b>1.0.0</b>
      </div>
    </div>
  );
}
