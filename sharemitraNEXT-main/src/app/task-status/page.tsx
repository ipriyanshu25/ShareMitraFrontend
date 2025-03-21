"use client";

import React, { useState } from "react";

const TaskStatus = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Design Homepage", status: "Pending", timestamp: "2025-03-20 10:30 AM" },
    { id: 2, name: "Fix Bug #42", status: "Not Completed", timestamp: "2025-03-19 03:15 PM" },
    { id: 3, name: "Deploy to Production", status: "Completed", timestamp: "2025-03-18 08:00 AM" },
  ]);

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Task Status History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">No.</th>
              <th className="px-4 py-3 border-b">Task Name</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{task.id}</td>
                <td className="px-4 py-2 border-b">{task.name}</td>
                <td className="px-4 py-2 border-b">{task.status}</td>
                <td className="px-4 py-2 border-b">{task.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskStatus;
