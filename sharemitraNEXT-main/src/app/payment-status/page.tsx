"use client";

import React, { useState } from "react";

const PaymentStatus = () => {
  // Example data showcasing task name, always using UPI
  const [payments, setPayments] = useState([
    {
      id: 1,
      taskName: "Design Homepage",
      method: "UPI",
      status: "Pending",
      timestamp: "2025-05-12 10:30 AM",
    },
    {
      id: 2,
      taskName: "Fix Bug #42",
      method: "UPI",
      status: "Completed",
      timestamp: "2025-05-13 09:45 AM",
    },
    {
      id: 3,
      taskName: "Deploy to Production",
      method: "UPI",
      status: "Failed",
      timestamp: "2025-05-14 02:15 PM",
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Payment Status
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">No.</th>
              <th className="px-4 py-3 border-b">Task</th>
              <th className="px-4 py-3 border-b">Payment Method</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{payment.id}</td>
                <td className="px-4 py-2 border-b">{payment.taskName}</td>
                <td className="px-4 py-2 border-b">{payment.method}</td>
                <td className="px-4 py-2 border-b">{payment.status}</td>
                <td className="px-4 py-2 border-b">{payment.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStatus;
