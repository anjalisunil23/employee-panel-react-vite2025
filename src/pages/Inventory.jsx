
  import React, { useState } from "react";
import { Package, Send } from "lucide-react";

export default function InventoryRequests() {
  const [form, setForm] = useState({
    item: "",
    quantity: "",
    reason: "",
  });

  const [requests, setRequests] = useState([
    {
      id: 1,
      item: "Shampoo Bottles",
      quantity: 10,
      reason: "Low stock",
      status: "Approved",
    },
    {
      id: 2,
      item: "Disposable Gloves",
      quantity: 50,
      reason: "Daily usage",
      status: "Pending",
    },
  ]);

  const submitRequest = () => {
    if (!form.item || !form.quantity || !form.reason) {
      alert("Please fill all fields");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
      status: "Pending",
    };

    setRequests([...requests, newRequest]);
    setForm({ item: "", quantity: "", reason: "" });
    alert("Inventory request submitted!");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center sm:text-left">
        Inventory Requests
      </h1>

      {/* Submit Inventory Request */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-100">
          <Package size={20} /> Submit Request
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              value={form.item}
              onChange={(e) => setForm({ ...form, item: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <input
              type="number"
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
            <textarea
              className="w-full p-2 mt-1 rounded-md border bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
              rows={3}
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            ></textarea>
          </div>
        </div>

        <button
          onClick={submitRequest}
          className="mt-4 w-full sm:w-auto px-5 py-2 bg-blue-600 text-white flex items-center justify-center gap-2 rounded-md hover:bg-blue-700"
        >
          <Send size={18} /> Submit Request
        </button>
      </div>

      {/* My Requests */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          My Requests
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-3 sm:p-4 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            >
              <p className="font-semibold text-gray-800 dark:text-gray-100">{req.item}</p>

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
                <span>Qty: {req.quantity}</span>
                <span
                  className={`font-semibold ${
                    req.status === "Approved"
                      ? "text-green-600 dark:text-green-400"
                      : req.status === "Rejected"
                      ? "text-red-600 dark:text-red-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Reason: {req.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
