import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const sales = [
  { week: 'W1', value: 1200 },
  { week: 'W2', value: 1500 },
  { week: 'W3', value: 1300 },
  { week: 'W4', value: 1700 },
];

export default function Reports() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Reports
      </h1>

      {/* Responsive grid: 1 column on mobile, 2 on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        {/* Weekly Sales */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-md md:text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Weekly Sales
          </h2>
          <div className="w-full h-48 md:h-56">
            <ResponsiveContainer>
              <BarChart data={sales}>
                <XAxis dataKey="week" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-md md:text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
            Performance Trend
          </h2>
          <div className="w-full h-48 md:h-56">
            <ResponsiveContainer>
              <LineChart data={sales}>
                <XAxis dataKey="week" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
