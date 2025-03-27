// "use client";

// import React, { useState } from "react";

// const TaskStatus = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, name: "Design Homepage", status: "Pending", timestamp: "2025-03-20 10:30 AM" },
//     { id: 2, name: "Fix Bug #42", status: "Not Completed", timestamp: "2025-03-19 03:15 PM" },
//     { id: 3, name: "Deploy to Production", status: "Completed", timestamp: "2025-03-18 08:00 AM" },
//   ]);

//   return (
//     <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Task Status History
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 text-left text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 border-b">No.</th>
//               <th className="px-4 py-3 border-b">Task Name</th>
//               <th className="px-4 py-3 border-b">Status</th>
//               <th className="px-4 py-3 border-b">Timestamp</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{task.id}</td>
//                 <td className="px-4 py-2 border-b">{task.name}</td>
//                 <td className="px-4 py-2 border-b">{task.status}</td>
//                 <td className="px-4 py-2 border-b">{task.timestamp}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TaskStatus;


"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const TaskStatus = () => {
  const [tasks] = useState([
    { id: 1, name: "Design Homepage", status: "Pending", timestamp: "2025-03-20 10:30 AM" },
    { id: 2, name: "Fix Bug #42", status: "Not Completed", timestamp: "2025-03-19 03:15 PM" },
    { id: 3, name: "Deploy to Production", status: "Completed", timestamp: "2025-03-18 08:00 AM" },
  ]);

  const statusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Not Completed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-green-200">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-8">
          Task Status History
        </h2>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full text-left text-sm">
            <thead className="bg-green-200 text-green-800 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 border-b">No.</th>
                <th className="px-6 py-3 border-b">Task Name</th>
                <th className="px-6 py-3 border-b">Status</th>
                <th className="px-6 py-3 border-b">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b hover:bg-green-100"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{task.id}</td>
                  <td className="px-6 py-4 text-gray-700">{task.name}</td>
                  <td>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${statusStyles(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{task.timestamp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
