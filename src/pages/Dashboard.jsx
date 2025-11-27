import React, { useState } from 'react';
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

// Sample appointment history data
const appointmentHistory = [
  {
    id: 1,
    date: '2025-11-27',
    time: '10:00 AM',
    customer: 'Emma Wilson',
    service: 'Haircut & Styling',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 45.00,
    duration: '45 min'
  },
  {
    id: 2,
    date: '2025-11-27',
    time: '11:30 AM',
    customer: 'James Smith',
    service: 'Beard Trim',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 25.00,
    duration: '30 min'
  },
  {
    id: 3,
    date: '2025-11-26',
    time: '02:15 PM',
    customer: 'Olivia Davis',
    service: 'Hair Color',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 85.00,
    duration: '2 hours'
  },
  {
    id: 4,
    date: '2025-11-25',
    time: '03:45 PM',
    customer: 'Robert Brown',
    service: 'Hot Towel Shave',
    staff: 'Carlos Mendez',
    status: 'cancelled',
    amount: 35.00,
    duration: '30 min'
  },
  {
    id: 5,
    date: '2025-11-24',
    time: '01:00 PM',
    customer: 'Sophia Garcia',
    service: 'Keratin Treatment',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 120.00,
    duration: '3 hours'
  },
  {
    id: 6,
    date: '2025-11-23',
    time: '11:00 AM',
    customer: 'David Kim',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  },
  {
    id: 7,
    date: '2025-11-22',
    time: '04:30 PM',
    customer: 'Ava Martinez',
    service: 'Balayage',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 150.00,
    duration: '3.5 hours'
  },
  {
    id: 8,
    date: '2025-11-21',
    time: '10:45 AM',
    customer: 'William Taylor',
    service: 'Haircut & Beard Trim',
    staff: 'Carlos Mendez',
    status: 'no-show',
    amount: 55.00,
    duration: '1 hour'
  },
  {
    id: 9,
    date: '2025-11-20',
    time: '02:00 PM',
    customer: 'Mia Anderson',
    service: 'Blowout',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 50.00,
    duration: '1 hour'
  },
  {
    id: 10,
    date: '2025-11-19',
    time: '03:15 PM',
    customer: 'Ethan Thomas',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  },
  {
    id: 11,
    date: '2025-11-18',
    time: '11:30 AM',
    customer: 'Isabella White',
    service: 'Highlights',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 95.00,
    duration: '2.5 hours'
  },
  {
    id: 12,
    date: '2025-11-17',
    time: '01:45 PM',
    customer: 'Noah Harris',
    service: 'Haircut & Beard Trim',
    staff: 'Carlos Mendez',
    status: 'completed',
    amount: 55.00,
    duration: '1 hour'
  },
  {
    id: 13,
    date: '2025-11-16',
    time: '10:15 AM',
    customer: 'Sophia Garcia',
    service: 'Root Touch-up',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 75.00,
    duration: '1.5 hours'
  },
  {
    id: 14,
    date: '2025-11-15',
    time: '03:30 PM',
    customer: 'James Smith',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  },
  {
    id: 15,
    date: '2025-11-14',
    time: '12:00 PM',
    customer: 'Emma Wilson',
    service: 'Hair Treatment',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 65.00,
    duration: '1.5 hours'
  },
  {
    id: 16,
    date: '2025-11-13',
    time: '02:45 PM',
    customer: 'Robert Brown',
    service: 'Beard Grooming',
    staff: 'Carlos Mendez',
    status: 'completed',
    amount: 30.00,
    duration: '30 min'
  },
  {
    id: 17,
    date: '2025-11-12',
    time: '11:00 AM',
    customer: 'Olivia Davis',
    service: 'Haircut & Color',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 120.00,
    duration: '2.5 hours'
  },
  {
    id: 18,
    date: '2025-11-11',
    time: '01:30 PM',
    customer: 'David Kim',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  },
  {
    id: 19,
    date: '2025-11-10',
    time: '10:45 AM',
    customer: 'Ava Martinez',
    service: 'Balayage Touch-up',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 130.00,
    duration: '3 hours'
  },
  {
    id: 20,
    date: '2025-11-09',
    time: '03:15 PM',
    customer: 'William Taylor',
    service: 'Haircut & Beard Trim',
    staff: 'Carlos Mendez',
    status: 'completed',
    amount: 55.00,
    duration: '1 hour'
  },
  {
    id: 21,
    date: '2025-11-08',
    time: '11:30 AM',
    customer: 'Mia Anderson',
    service: 'Blowout & Style',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 50.00,
    duration: '1 hour'
  },
  {
    id: 22,
    date: '2025-11-07',
    time: '02:00 PM',
    customer: 'Ethan Thomas',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  },
  {
    id: 23,
    date: '2025-11-06',
    time: '10:15 AM',
    customer: 'Isabella White',
    service: 'Full Highlights',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 140.00,
    duration: '3 hours'
  },
  {
    id: 24,
    date: '2025-11-05',
    time: '01:45 PM',
    customer: 'Noah Harris',
    service: 'Haircut & Beard Trim',
    staff: 'Carlos Mendez',
    status: 'completed',
    amount: 55.00,
    duration: '1 hour'
  },
  {
    id: 25,
    date: '2025-11-04',
    time: '11:00 AM',
    customer: 'Sophia Garcia',
    service: 'Root Touch-up & Toner',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 90.00,
    duration: '2 hours'
  },
  {
    id: 26,
    date: '2025-11-03',
    time: '03:30 PM',
    customer: 'James Smith',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  },
  {
    id: 27,
    date: '2025-11-02',
    time: '12:15 PM',
    customer: 'Emma Wilson',
    service: 'Keratin Treatment',
    staff: 'Lisa Wong',
    status: 'completed',
    amount: 120.00,
    duration: '3 hours'
  },
  {
    id: 28,
    date: '2025-11-01',
    time: '10:30 AM',
    customer: 'Robert Brown',
    service: 'Beard Trim & Shape-up',
    staff: 'Carlos Mendez',
    status: 'completed',
    amount: 25.00,
    duration: '30 min'
  },
  {
    id: 29,
    date: '2025-10-31',
    time: '02:45 PM',
    customer: 'Olivia Davis',
    service: 'Haircut & Blowout',
    staff: 'Sarah Johnson',
    status: 'completed',
    amount: 75.00,
    duration: '1.5 hours'
  },
  {
    id: 30,
    date: '2025-10-30',
    time: '11:15 AM',
    customer: 'David Kim',
    service: 'Haircut',
    staff: 'Mike Chen',
    status: 'completed',
    amount: 40.00,
    duration: '45 min'
  }
];

const AppointmentHistory = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const itemsPerPage = isMobile ? 5 : 10;

  // Filter appointments based on selected time range
  const filterAppointments = () => {
    const today = new Date();
    const filtered = appointmentHistory.filter(appt => {
      const apptDate = new Date(appt.date);
      const timeDiff = today - apptDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      if (searchQuery && !appt.customer.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (timeRange === 'week') return daysDiff <= 7;
      if (timeRange === 'month') return daysDiff <= 30;
      if (timeRange === 'year') return daysDiff <= 365;
      return true;
    });

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredAppointments = filterAppointments();
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'no-show': 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Update mobile state on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            Appointment History
          </h2>

          <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-1 sm:inline-flex rounded-md shadow-sm">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } border border-gray-300 dark:border-gray-600 rounded-md ${range === 'week' ? 'rounded-r-none' : range === 'year' ? 'rounded-l-none' : 'rounded-none'
                    }`}
                  onClick={() => {
                    setTimeRange(range);
                    setCurrentPage(1);
                  }}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 hidden sm:table-header-group">
            <tr>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                Staff
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                Duration
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-3 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedAppointments.length > 0 ? (
              paginatedAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 block sm:table-row mb-2 sm:mb-0">
                  <td className="px-3 py-2 sm:py-3 whitespace-nowrap block sm:table-cell" data-label="Date & Time">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-3 py-1 sm:py-3 whitespace-nowrap block sm:table-cell" data-label="Customer">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {isMobile ? (
                        <span className="truncate max-w-[120px] inline-block">{appointment.customer}</span>
                      ) : (
                        appointment.customer
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-1 sm:py-3 whitespace-nowrap block sm:table-cell" data-label="Service">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                      {isMobile ? (
                        <span className="truncate max-w-[100px] inline-block">{appointment.service}</span>
                      ) : (
                        appointment.service
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-1 sm:py-3 whitespace-nowrap hidden md:table-cell" data-label="Staff">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {appointment.staff}
                    </div>
                  </td>
                  <td className="px-3 py-1 sm:py-3 whitespace-nowrap hidden sm:table-cell" data-label="Duration">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {appointment.duration}
                    </div>
                  </td>
                  <td className="px-3 py-1 sm:py-3 whitespace-nowrap block sm:table-cell" data-label="Amount">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      ₹{Math.round(appointment.amount * 75).toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-3 py-1 sm:py-3 whitespace-nowrap block sm:table-cell" data-label="Status">
                    <div className="text-xs sm:text-sm">
                      {getStatusBadge(appointment.status)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAppointments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex items-center justify-between sm:justify-between w-full">
            <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <span className="hidden sm:inline">Showing </span>
              <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAppointments.length)}</span>
              <span className="hidden sm:inline"> of </span>
              <span className="sm:hidden">/</span>
              <span className="font-medium">{filteredAppointments.length}</span>
              <span className="hidden sm:inline"> results</span>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-1 sm:px-2 sm:py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs sm:text-sm font-medium ${currentPage === 1
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {!isMobile && Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first 2 pages, current page with 1 before and after, and last 2 pages
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border text-xs sm:text-sm font-medium ${currentPage === pageNum
                        ? 'z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-200'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {isMobile && (
                  <span className="relative inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200">
                    {currentPage} / {totalPages}
                  </span>
                )}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-1 sm:px-2 sm:py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs sm:text-sm font-medium ${currentPage === totalPages
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen space-y-3 sm:space-y-4 md:space-y-6">

      {/* Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white px-1 sm:px-2">
        Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {[
          { title: "Total tasks", value: 25 },
          { title: "Tasks completed", value: 12 },
          { title: "Pending tasks", value: 7 },
        ].map((stat, i) => (
          <div key={i} className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow">
            <h2 className="text-xs text-gray-500 dark:text-gray-300">{stat.title}</h2>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Attendance Bar Chart */}
        <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-800 dark:text-gray-100">
            Weekly Attendance
          </h2>
          <div className="w-full h-[180px] xs:h-[200px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: "#F9FAFB" }}
                />
                <Bar dataKey="present" fill="#0088FE" name="Present" />
                <Bar dataKey="absent" fill="#FF8042" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Pie Chart */}
        <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-gray-800 dark:text-gray-100">
            Appointments by Service
          </h2>
          <div className="w-full h-[180px] xs:h-[200px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentData}
                  dataKey="value"
                  outerRadius={60}
                  innerRadius={30}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {appointmentData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    fontSize: '12px',
                    paddingTop: '10px',
                    color: '#9CA3AF'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow overflow-hidden">
          <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Upcoming Appointments
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingAppointments.map((appt, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {appt.time}
                    </td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {appt.client}
                    </td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {appt.service}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow overflow-hidden">
          <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100">
              Today's Schedule
            </h2>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {todaysSchedule.map((item, i) => (
              <li
                key={i}
                className="px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.task}
                </span>
                <span className="text-2xs xs:text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Appointment History Section */}
      <div className="mt-4 md:mt-8">
        <AppointmentHistory />
      </div>
    </div>
  );
}
