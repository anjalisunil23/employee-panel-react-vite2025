import React, { useState } from "react";
import { Search, Filter, User, Calendar, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function Appointments() {
  const [search, setSearch] = useState("");

  const appointments = [
    { id: 1, name: "Aarohi Sharma", service: "Haircut + Blow Dry", date: "25 Nov 2025", time: "11:30 AM", status: "Confirmed" },
    { id: 2, name: "Priya Singh", service: "Facial Treatment", date: "25 Nov 2025", time: "01:00 PM", status: "Pending" },
    { id: 3, name: "Rahul Verma", service: "Hair Spa", date: "26 Nov 2025", time: "10:00 AM", status: "Completed" },
    { id: 4, name: "Neha Jain", service: "Bridal Makeup Trial", date: "26 Nov 2025", time: "03:00 PM", status: "Cancelled" },
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 text-sm rounded-full flex items-center gap-1";
    switch (status) {
      case "Confirmed":
        return <span className={`${baseClasses} bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-400`}><CheckCircle size={14}/> Confirmed</span>;
      case "Pending":
        return <span className={`${baseClasses} bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400`}><Loader2 size={14}/> Pending</span>;
      case "Completed":
        return <span className={`${baseClasses} bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-400`}><CheckCircle size={14}/> Completed</span>;
      case "Cancelled":
        return <span className={`${baseClasses} bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-400`}><XCircle size={14}/> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Appointments</h1>
      <p className="text-gray-600 dark:text-gray-300">List of upcoming customer appointments.</p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Appointments: Table for md+, Cards for mobile */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="text-left p-3 md:p-4">Customer</th>
              <th className="text-left p-3 md:p-4">Service</th>
              <th className="text-left p-3 md:p-4">Date</th>
              <th className="text-left p-3 md:p-4">Time</th>
              <th className="text-left p-3 md:p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {appointments.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
              .map(a => (
                <tr key={a.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="p-3 md:p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                      <User size={18} />
                    </div>
                    {a.name}
                  </td>
                  <td className="p-3 md:p-4">{a.service}</td>
                  <td className="p-3 md:p-4 flex items-center gap-2"><Calendar size={16}/> {a.date}</td>
                  <td className="p-3 md:p-4 flex items-center gap-2"><Clock size={16}/> {a.time}</td>
                  <td className="p-3 md:p-4">{getStatusBadge(a.status)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {appointments.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
          .map(a => (
            <div key={a.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100">{a.name}</div>
              </div>
              <div className="text-gray-600 dark:text-gray-300">{a.service}</div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar size={16}/> {a.date}
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock size={16}/> {a.time}
              </div>
              <div>{getStatusBadge(a.status)}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
