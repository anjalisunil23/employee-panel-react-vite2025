import React from 'react';
import {
<<<<<<< HEAD
  BarChart,
  Bar,
=======
  LineChart,
  Line,
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
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

<<<<<<< HEAD
// Attendance data for the bar chart
=======
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
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

<<<<<<< HEAD
// Today's schedule
=======
// ⭐ NEW - Today’s Schedule Overview
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
const todaysSchedule = [
  { time: "09:00 AM", task: "Opening & Setup" },
  { time: "10:30 AM", task: "Team Meeting" },
  { time: "12:00 PM", task: "Inventory Check" },
  { time: "02:00 PM", task: "Client Follow-ups" },
  { time: "05:00 PM", task: "Salon Closing Checklist" },
];

export default function Dashboard() {
  return (
<<<<<<< HEAD
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
=======
    <div>
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Total tasks</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">25</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Task's completed</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">12</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-gray-500 dark:text-gray-300">Pending tasks</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">7</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
<<<<<<< HEAD
        {/* Attendance Bar Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
=======
        {/* Attendance Line Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
<<<<<<< HEAD
              <Bar dataKey="present" fill="#0088FE" />
              <Bar dataKey="absent" fill="#FF8042" />
            </BarChart>
=======
              <Line type="monotone" dataKey="present" stroke="#0088FE" strokeWidth={2} />
              <Line type="monotone" dataKey="absent" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
          </ResponsiveContainer>
        </div>

        {/* Appointment Pie Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Appointments by Service</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={appointmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {appointmentData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Upcoming Appointments</h2>
        <ul>
          {upcomingAppointments.map((appt, i) => (
            <li key={i} className="flex justify-between p-2 border-b border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-800 dark:text-gray-100">{appt.time}</span>
              <span className="text-gray-600 dark:text-gray-300">{appt.client}</span>
              <span className="text-gray-500 dark:text-gray-400">{appt.service}</span>
            </li>
          ))}
        </ul>
      </div>

<<<<<<< HEAD
      {/* Today’s Schedule Overview */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Today's Schedule Overview</h2>
=======
      {/* ⭐ TODAY’S SCHEDULE OVERVIEW */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Today's Schedule Overview</h2>

>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
        <ul className="space-y-3">
          {todaysSchedule.map((item, i) => (
            <li
              key={i}
              className="flex justify-between p-3 border rounded-lg border-gray-200 dark:border-gray-700"
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
<<<<<<< HEAD

=======
>>>>>>> aecbad16d5ae2ad7c22fe02ecc9b97a1d72b7517
