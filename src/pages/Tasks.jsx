import React, { useState } from "react";
import { Plus, User, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function Tasks() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Clean Hair Styling Stations",
      employee: "Aarav",
      priority: "High",
      due: "25 Nov 2025",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Stock Hair Products Shelf",
      employee: "Neha",
      priority: "Medium",
      due: "26 Nov 2025",
      status: "Pending",
    },
    {
      id: 3,
      title: "Prepare Bridal Makeup Kit",
      employee: "Simran",
      priority: "High",
      due: "27 Nov 2025",
      status: "Completed",
    },
  ]);

  const getPriorityBadge = (p) => {
    switch (p) {
      case "High":
        return <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">High</span>;
      case "Medium":
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">Medium</span>;
      case "Low":
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">Low</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
            <CheckCircle size={14} /> Completed
          </span>
        );
      case "In Progress":
        return (
          <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full flex items-center gap-1">
            <Clock size={14} /> In Progress
          </span>
        );
      case "Pending":
        return (
          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
            <AlertCircle size={14} /> Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Tasks</h1>
        <p className="text-gray-600 dark:text-gray-300">Assign and track tasks for employees.</p>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="text-left p-4">Task</th>
              <th className="text-left p-4">Assigned To</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t) => (
              <tr
                key={t.id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-4 text-gray-800 dark:text-gray-100">{t.title}</td>

                <td className="p-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  {t.employee}
                </td>

                <td className="p-4">{getPriorityBadge(t.priority)}</td>

                <td className="p-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar size={16} /> {t.due}
                </td>

                <td className="p-4">{getStatusBadge(t.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-gray-900 shadow rounded-xl space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t.title}</h3>
              {getPriorityBadge(t.priority)}
            </div>

            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="font-medium">{t.employee}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar size={16} />
              {t.due}
            </div>

            <div>{getStatusBadge(t.status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
