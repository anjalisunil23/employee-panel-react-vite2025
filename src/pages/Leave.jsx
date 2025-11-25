import React, { useState } from "react";
import { CalendarDays, Send } from "lucide-react";

export default function LeaveManagement() {
  // -----------------------------
  // 🌿 Local Dummy Leave Types
  // -----------------------------
  const leaveTypes = [
    { id: 1, name: "Sick Leave", allowed_days: 10 },
    { id: 2, name: "Casual Leave", allowed_days: 12 },
    { id: 3, name: "Paid Leave", allowed_days: 15 },
  ];

  // -----------------------------
  // 🌿 Local State
  // -----------------------------
  const [myLeaves, setMyLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const [leaveForm, setLeaveForm] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  // -----------------------------
  // 🌿 Submit Leave (Frontend Only)
  // -----------------------------
  const submitLeave = () => {
    if (!leaveForm.type || !leaveForm.from || !leaveForm.to || !leaveForm.reason) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const newLeave = {
      id: Date.now(),
      leave_type: leaveTypes.find((t) => t.id === Number(leaveForm.type)).name,
      from_date: leaveForm.from,
      to_date: leaveForm.to,
      reason: leaveForm.reason,
      status: "Pending",
    };

    setTimeout(() => {
      setMyLeaves([...myLeaves, newLeave]);

      setLeaveForm({ type: "", from: "", to: "", reason: "" });

      setLoading(false);
      alert("Leave request submitted!");
    }, 800);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
        Leave Management
      </h1>

      {/* Apply Leave */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-100">
          <CalendarDays size={20} /> Apply for Leave
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Leave Types */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Leave Type
            </label>
            <select
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              value={leaveForm.type}
              onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
            >
              <option value="">Select Type</option>
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.allowed_days} days)
                </option>
              ))}
            </select>
          </div>

          {/* From */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              From
            </label>
            <input
              type="date"
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              value={leaveForm.from}
              onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
            />
          </div>

          {/* To */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              To
            </label>
            <input
              type="date"
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              value={leaveForm.to}
              onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
            />
          </div>

          {/* Reason */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reason
            </label>
            <textarea
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              rows={3}
              value={leaveForm.reason}
              onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={submitLeave}
          disabled={loading}
          className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white flex items-center justify-center gap-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          <Send size={18} />
          {loading ? "Submitting..." : "Submit Leave"}
        </button>
      </div>

      {/* My Leaves */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          My Leave Requests
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {myLeaves.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">No leave records yet.</p>
          )}

          {myLeaves.map((leave) => (
            <div
              key={leave.id}
              className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {leave.leave_type}
              </p>

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>
                  {leave.from_date} → {leave.to_date}
                </span>

                <span
                  className={`font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600 dark:text-green-400"
                      : leave.status === "Rejected"
                      ? "text-red-600 dark:text-red-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {leave.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Reason: {leave.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
