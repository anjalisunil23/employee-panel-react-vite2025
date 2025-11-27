import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiCalendar, FiCheckCircle, FiXCircle, FiClock, FiTrendingUp, FiPieChart } from "react-icons/fi";
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
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LabelList
} from "recharts";

// Theme Colors
const theme = {
  primary: '#9F7AEA', // Lavender
  primaryLight: '#B794F4',
  primaryDark: '#805AD5',
  success: '#48BB78',
  danger: '#F56565',
  warning: '#ECC94B',
  info: '#4299E1',
  dark: '#2D3748',
  light: '#F7FAFC'
};

const weeklyData = [
  { day: "Mon", present: 25, absent: 5 },
  { day: "Tue", present: 27, absent: 3 },
  { day: "Wed", present: 23, absent: 7 },
  { day: "Thu", present: 28, absent: 2 },
  { day: "Fri", present: 30, absent: 1 },
  { day: "Sat", present: 29, absent: 2 },
];

const monthlyTrend = [
  { month: 'Jan', present: 85, absent: 15 },
  { month: 'Feb', present: 82, absent: 18 },
  { month: 'Mar', present: 88, absent: 12 },
  { month: 'Apr', present: 90, absent: 10 },
  { month: 'May', present: 92, absent: 8 },
  { month: 'Jun', present: 94, absent: 6 },
  { month: 'Jul', present: 96, absent: 4 },
  { month: 'Aug', present: 95, absent: 5 },
  { month: 'Sep', present: 93, absent: 7 },
  { month: 'Oct', present: 91, absent: 9 },
  { month: 'Nov', present: 89, absent: 11 },
  { month: 'Dec', present: 87, absent: 13 },
];

const appointmentData = [
  { name: "Haircut", value: 42 },
  { name: "Facial", value: 35 },
  { name: "Manicure", value: 28 },
  { name: "Pedicure", value: 24 },
  { name: "Massage", value: 18 },
];

const COLORS = [
  "#9F7AEA", // Lavender - Haircut
  "#48BB78", // Green - Facial
  "#4299E1", // Blue - Manicure
  "#F6E05E", // Yellow - Pedicure
  "#F6AD55", // Orange - Massage
  "#F687B3", // Pink - Waxing
  "#4FD1C5", // Teal - Hair Color
  "#B794F4", // Light Purple - Hair Treatment
  "#68D391", // Light Green - Makeup
  "#F6AD55"  // Orange - Nail Art
];

export default function Attendance() {
  const today = new Date();
  const [date, setDate] = useState(today);

  // Generate random attendance data for the current month
  const getRandomAttendance = (date) => {
    // 70% chance of being present
    return Math.random() > 0.3 ? 'present' : 'absent';
  };

  // Generate attendance data for the current month
  const getAttendanceForMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const attendance = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = new Date(year, month, day).toDateString();
      attendance[dateKey] = getRandomAttendance(new Date(year, month, day));
    }

    return attendance;
  };

  const [attendanceData, setAttendanceData] = useState(() =>
    getAttendanceForMonth(today.getFullYear(), today.getMonth())
  );

  const handleMonthChange = ({ activeStartDate }) => {
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth();
    setAttendanceData(getAttendanceForMonth(year, month));
  };

  // Calculate summary
  const totalPresent = Object.values(attendanceData).filter(
    status => status === 'present'
  ).length;
  const totalAbsent = Object.values(attendanceData).filter(
    status => status === 'absent'
  ).length;
  const workingDays = Object.keys(attendanceData).length;

  // Calculate attendance percentage
  const attendancePercentage = Math.round((totalPresent / workingDays) * 100);
  const attendanceTrend = attendancePercentage > 90 ? 'up' : attendancePercentage > 75 ? 'stable' : 'down';

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Attendance Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Track and manage employee attendance records
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <FiCalendar className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-purple-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Working Days</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{workingDays}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This month</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
              <FiClock size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-green-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Present Days</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{totalPresent}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((totalPresent / workingDays) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
              <FiCheckCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-red-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Absent Days</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{totalAbsent}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((totalAbsent / workingDays) * 100).toFixed(1)}% of total
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
              <FiXCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-5 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Attendance Rate</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {attendancePercentage}%
              </h3>
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${attendanceTrend === 'up' ? 'text-green-500' :
                  attendanceTrend === 'down' ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                  {attendanceTrend === 'up' ? '↑' : attendanceTrend === 'down' ? '↓' : '→'}
                  {attendanceTrend === 'up' ? 'Improved' : attendanceTrend === 'down' ? 'Decreased' : 'Stable'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              <FiTrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CALENDAR */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Attendance Calendar
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-1.5"></span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Present</span>
              </div>
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full mr-1.5"></span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Absent</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Calendar
              value={date}
              onChange={setDate}
              onActiveStartDateChange={handleMonthChange}
              className="w-full max-w-2xl border-0 bg-transparent text-gray-800 dark:text-gray-200"
              navigationLabel={({ date, label }) => (
                <span className="text-gray-800 dark:text-white font-medium">{label}</span>
              )}
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const dateKey = date.toDateString();
                  const attendanceStatus = attendanceData[dateKey];

                  let classes = 'p-2 rounded-lg text-sm font-medium transition-colors duration-200';

                  if (date.toDateString() === today.toDateString()) {
                    classes += ' border-2 border-indigo-500';
                  } else {
                    classes += ' border border-transparent';
                  }

                  if (attendanceStatus === 'present') {
                    classes += ' bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30';
                  } else if (attendanceStatus === 'absent') {
                    classes += ' bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30';
                  } else {
                    classes += ' hover:bg-gray-50 dark:hover:bg-gray-700/50';
                  }

                  return classes;
                }
                return null;
              }}
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const dateKey = date.toDateString();
                  const attendanceStatus = attendanceData[dateKey];

                  if (attendanceStatus === 'present') {
                    return (
                      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                        <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                      </div>
                    );
                  } else if (attendanceStatus === 'absent') {
                    return (
                      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                      </div>
                    );
                  }
                }
                return null;
              }}
              formatShortWeekday={(locale, date) =>
                ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
              }
              nextLabel={
                <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">›</span>
              }
              prevLabel={
                <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">‹</span>
              }
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </div>

        {/* WEEKLY STATS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Weekly Overview
            </h2>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <FiTrendingUp size={18} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">This Week's Attendance</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">94.5%</h3>
                <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
                  <span>↑ 2.4%</span>
                  <span className="ml-1 text-xs">vs last week</span>
                </span>
              </div>
            </div>

            <div className="h-48 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                    strokeOpacity={0.2}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                    labelStyle={{
                      color: '#4B5563',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}
                    itemStyle={{
                      color: '#4B5563',
                      padding: '2px 0',
                      textTransform: 'capitalize'
                    }}
                    formatter={(value, name) => {
                      if (name === 'present') return [value, 'Present'];
                      if (name === 'absent') return [value, 'Absent'];
                      return [value, name];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="#9F7AEA"
                    fillOpacity={1}
                    fill="url(#presentGradient)"
                    strokeWidth={2}
                    activeDot={{ r: 6, stroke: '#805AD5', strokeWidth: 2, fill: '#FFFFFF' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg. Present</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">27</p>
                <p className="text-xs text-green-500 mt-1">+2.1% from last week</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg. Absent</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">3.3</p>
                <p className="text-xs text-red-500 mt-1">-0.8% from last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE DISTRIBUTION */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Service Distribution
          </h2>
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <FiPieChart size={18} />
          </div>
        </div>

        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={appointmentData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {appointmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const total = appointmentData.reduce((sum, item) => sum + item.value, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return [`${value} (${percentage}%)`, name];
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  fontSize: '12px',
                  padding: '8px 12px'
                }}
                itemStyle={{
                  color: '#4B5563',
                  padding: '2px 0',
                  textTransform: 'capitalize'
                }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{
                  paddingLeft: '20px',
                  fontSize: '12px',
                  color: '#6B7280'
                }}
                formatter={(value, entry, index) => {
                  const total = appointmentData.reduce((sum, item) => sum + item.value, 0);
                  const percentage = ((entry.payload.value / total) * 100).toFixed(1);
                  return `${value} (${percentage}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MONTHLY TREND */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Monthly Attendance Trend
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Attendance rate over the past year</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="h-2 w-8 bg-purple-500 rounded mr-2"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Present</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-8 bg-red-500 rounded mr-2"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Absent</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTrend}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  fontSize: '12px',
                  padding: '8px 12px'
                }}
                labelStyle={{
                  color: '#4B5563',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}
                itemStyle={{
                  color: '#4B5563',
                  padding: '2px 0',
                  textTransform: 'capitalize'
                }}
                formatter={(value, name) => {
                  if (name === 'present') return [value, 'Present'];
                  if (name === 'absent') return [value, 'Absent'];
                  return [value, name];
                }}
              />
              <Bar
                dataKey="present"
                fill="#9F7AEA"
                radius={[4, 4, 0, 0]}
                barSize={16}
              >
                <LabelList
                  dataKey="present"
                  position="top"
                  formatter={(value) => `${value}%`}
                  style={{
                    fill: '#6B46C1',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                />
              </Bar>
              <Bar
                dataKey="absent"
                fill="#F56565"
                radius={[4, 4, 0, 0]}
                barSize={16}
              >
                <LabelList
                  dataKey="absent"
                  position="top"
                  formatter={(value) => `${value}%`}
                  style={{
                    fill: '#E53E3E',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
