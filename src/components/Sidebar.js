import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, ClipboardList, Briefcase, CalendarRange, PackageSearch, Package, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ collapsed, onCollapse, onNavigate }) {
  const menu = [
    { name: 'Dashboard', to: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Attendance', to: '/attendance', icon: <CalendarCheck size={18} /> },
    { name: 'Appointments', to: '/appointments', icon: <ClipboardList size={18} /> },
    { name: 'Tasks', to: '/tasks', icon: <Briefcase size={18} /> },
    { name: 'Leave Management', to: '/leave', icon: <CalendarRange size={18} /> },
    { name: 'Inventory Requests', to: '/inventory', icon: <PackageSearch size={18} /> },
    { name: 'Products & Services', to: '/products', icon: <Package size={18} /> },
    { name: 'Settings', to: '/settings', icon: <SlidersHorizontal size={18} /> },

  ]

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-white dark:bg-gray-900 border-r dark:border-gray-800 h-full ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed ? (
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Employee Panel</h2>
        ) : (
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">E</div>
        )}
        <button onClick={onCollapse} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <ChevronLeft size={18} className={`transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {menu.map((m) => (
          <NavLink
            to={m.to}
            key={m.to}
            onClick={() => onNavigate && onNavigate()}
            className={({ isActive }) =>
              `group flex items-center gap-3 p-3 rounded-lg transition-colors duration-150 ${isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`
            }
            end
          >
            <div className="opacity-90">{m.icon}</div>
            {!collapsed && <span className="text-sm font-medium">{m.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <button className="w-full text-sm py-2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white">Quick Clock In</button>
      </div>
    </motion.aside>
  )
}