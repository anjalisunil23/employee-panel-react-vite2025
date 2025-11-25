import React from 'react';
import {
  BarChart,
  Bar,
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

const appointmentData = [
  { name: 'Haircut', value: 10 },
  { name: 'Facial', value: 7 },
  { name: 'Manicure', value: 5 },
  { name: 'Pedicure', value: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const upcomingAppointments = [
  { time: '10:00 AM', client: 'Sarah Johnson', service: 'Haircut' },
  { time: '11:30 AM', client: 'Michael Brown', service: 'Facial' },
  { time: '01:00 PM', client: 'Emily Davis', service: 'Manicure' },
  { time: '03:00 PM', client: 'David Wilson', service: 'Pedicure' },
];

const todaysSchedule = [
  { time: "09:00 AM", task: "Opening & Setup" },
  { time: "10:30 AM", task: "Team Meeting" },
  { time: "12:00 PM", task: "Inventory Check" },
  { time: "02:00 PM", task: "Client Follow-ups" },
  { time: "05:00 PM", task: "Salon Closing Checklist" },
];

export default function Dashboard() {
  return (
    <div className="p-3 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen space-y-6">

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { title: "Total tasks", value: 25 },
          { title: "Tasks completed", value: 12 },
          { title: "Pending tasks", value: 7 },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-gray-500 dark:text-gray-300 text-sm">{stat.title}</h2>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Attendance Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Weekly Attendance
          </h2>

          {/* Mobile horizontal scroll support */}
          <div className="w-[600px] md:w-full">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                  itemStyle={{ color: "#F9FAFB" }}
                />
                <Bar dataKey="present" fill="#0088FE" />
                <Bar dataKey="absent" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Pie Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Appointments by Service
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={appointmentData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {appointmentData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "#D1D5DB" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Upcoming Appointments */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Upcoming Appointments
        </h2>

        <ul className="space-y-3">
          {upcomingAppointments.map((appt, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between
                         gap-1 p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <span className="font-medium text-gray-800 dark:text-gray-100">{appt.time}</span>
              <span className="text-gray-600 dark:text-gray-300">{appt.client}</span>
              <span className="text-gray-500 dark:text-gray-400">{appt.service}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Today's Schedule */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Today’s Schedule Overview
        </h2>

        <ul className="space-y-3">
          {todaysSchedule.map((item, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row justify-between p-3 border rounded-md
                         border-gray-200 dark:border-gray-700"
            >
              <span className="font-medium text-gray-800 dark:text-gray-100">{item.task}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
