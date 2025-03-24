// "use client";

// import React, { useState } from "react";

// const PaymentStatus = () => {
//   // Example data showcasing task name, always using UPI
//   const [payments, setPayments] = useState([
//     {
//       id: 1,
//       taskName: "Design Homepage",
//       method: "UPI",
//       status: "Pending",
//       timestamp: "2025-05-12 10:30 AM",
//     },
//     {
//       id: 2,
//       taskName: "Fix Bug #42",
//       method: "UPI",
//       status: "Completed",
//       timestamp: "2025-05-13 09:45 AM",
//     },
//     {
//       id: 3,
//       taskName: "Deploy to Production",
//       method: "UPI",
//       status: "Failed",
//       timestamp: "2025-05-14 02:15 PM",
//     },
//   ]);

//   return (
//     <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Payment Status
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 text-left text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 border-b">No.</th>
//               <th className="px-4 py-3 border-b">Task</th>
//               <th className="px-4 py-3 border-b">Payment Method</th>
//               <th className="px-4 py-3 border-b">Status</th>
//               <th className="px-4 py-3 border-b">Timestamp</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{payment.id}</td>
//                 <td className="px-4 py-2 border-b">{payment.taskName}</td>
//                 <td className="px-4 py-2 border-b">{payment.method}</td>
//                 <td className="px-4 py-2 border-b">{payment.status}</td>
//                 <td className="px-4 py-2 border-b">{payment.timestamp}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentStatus;





"use client";

import React, { useState } from "react";
import { BadgeCheck, Clock, AlertTriangle } from "lucide-react";

const PaymentStatus = () => {
  const [payments] = useState([
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <BadgeCheck className="text-green-600 inline-block" />;
      case "Pending":
        return <Clock className="text-yellow-600 inline-block" />;
      case "Failed":
        return <AlertTriangle className="text-red-600 inline-block" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 p-10 bg-gray-50 rounded-3xl shadow-xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Payment Status
      </h2>
      <div className="overflow-hidden rounded-xl shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={payment.id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-indigo-50 transition duration-300`}
              >
                <td className="px-6 py-4 border-b text-gray-700 font-medium">{payment.id}</td>
                <td className="px-6 py-4 border-b font-semibold text-gray-800">
                  {payment.taskName}
                </td>
                <td className="px-6 py-4 border-b text-gray-600">{payment.method}</td>
                <td className="px-6 py-4 border-b font-medium">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(payment.status)}
                    <span>{payment.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 border-b text-gray-500">
                  {payment.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentStatus;