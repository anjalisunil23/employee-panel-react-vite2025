import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const attendanceData = [
  { day: 'Mon', present: 20, absent: 5 },
  { day: 'Tue', present: 22, absent: 3 },
  { day: 'Wed', present: 18, absent: 7 },
  { day: 'Thu', present: 23, absent: 2 },
  { day: 'Fri', present: 25, absent: 1 },
  { day: 'Sat', present: 24, absent: 2 },
];

const monthlyAttendance = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  status: Math.random() > 0.2 ? "P" : "A",
}));

const appointmentData = [
  { name: 'Haircut', value: 10 },
  { name: 'Facial', value: 7 },
  { name: 'Manicure', value: 5 },
  { name: 'Pedicure', value: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Attendance() {
  const totalPresent = monthlyAttendance.filter(d => d.status === "P").length;
  const totalAbsent = monthlyAttendance.filter(d => d.status === "A").length;
  const workingDays = monthlyAttendance.length;

  return (
    <div className="p-3 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
        Attendance
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { title: "Working Days", value: workingDays, color: "text-gray-800 dark:text-gray-100" },
          { title: "Present Days", value: totalPresent, color: "text-green-600 dark:text-green-400" },
          { title: "Absent Days", value: totalAbsent, color: "text-red-600 dark:text-red-400" },
          { title: "Attendance %", value: ((totalPresent / workingDays) * 100).toFixed(1) + "%", color: "text-blue-600 dark:text-blue-400" },
        ].map((card, i) => (
          <div
            key={i}
            className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xs text-gray-500 dark:text-gray-300">{card.title}</h2>
            <p className={`text-lg font-semibold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* MONTHLY GRID */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Monthly Attendance Report
        </h2>

        {/* MOBILE GRID FIX: 4 columns on smallest screens */}
        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-10 gap-2">
          {monthlyAttendance.map(day => (
            <div
              key={day.day}
              className={`p-2 text-center rounded-lg font-bold text-white text-xs ${
                day.status === "P" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 bg-green-500 rounded"></span> Present
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 bg-red-500 rounded"></span> Absent
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* LINE CHART */}
        <div className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Weekly Attendance
          </h2>

          {/* Horizontal scroll on mobile */}
          <div className="min-w-[500px] md:min-w-0 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                <XAxis dataKey="day" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', color: '#fff', borderRadius: 6 }} />
                <Line type="monotone" dataKey="present" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#FF8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Appointments by Service
          </h2>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label={{ fill: '#fff', fontSize: 12 }}
                >
                  {appointmentData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ color: '#d1d5db' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
