"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  message: string;
  link: string;
  created_at: string;
  isNew: number;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://127.0.0.1:5000/task/tasks");
        const data = await response.json();
        if (data.status === 1 && data.tasks) {
          const fetchedTasks: Task[] = data.tasks.map((task: any) => ({
            id: task.id,
            title: task.title,
            message: task.message,
            link: task.link,
            created_at: task.created_at,
            isNew: task.isNew,
          }));
          // Optional: sort tasks by created_at descending
          const sortedTasks = fetchedTasks.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setTasks(sortedTasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleCopyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    alert("Message copied!");
  };

  const handleSendWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const handleBroadcastWhatsApp = (message: string) => {
    // This function opens WhatsApp with the message pre-filled.
    // The user can then choose a broadcast list manually within WhatsApp.
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  // Proceed to Next Step for a specific task
  const handleNextStepForTask = (taskId: string) => {
    window.location.href = `/home/taskupload?taskId=${taskId}`;
  };

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-center">
      <div className="flex flex-col items-center flex-grow p-6 mt-16 w-full max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-green-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to ShareMitra!
        </motion.h1>

        <motion.p
          className="text-lg text-green-700 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Earn money effortlessly by completing simple tasks. Follow the steps
          below and start earning now! 🚀
        </motion.p>

        {/* Task Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full border border-gray-200">
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.map((task) => {
              const showNewIcon = task.isNew === 1;
              return (
                <div
                  key={task.id}
                  className="mb-4 border-b border-gray-300 pb-4"
                >
                  <button
                    className="w-full text-left text-xl font-semibold text-gray-800 flex justify-between items-center"
                    onClick={() => toggleTask(task.id)}
                  >
                    <span className="flex items-center">
                      Task - {task.title}
                      {showNewIcon && (
                        <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                          NEW
                        </span>
                      )}
                    </span>
                    <span>{expandedTask === task.id ? "▲" : "▼"}</span>
                  </button>

                  {/* Expanded Task Details */}
                  {expandedTask === task.id && (
                    <div className="mt-4 text-gray-600">
                      <p className="mb-2">{task.message}</p>
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 text-blue-500 underline"
                      >
                        {task.link}
                      </a>
                      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <button
                          className="flex-1 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
                          onClick={() =>
                            handleCopyMessage(task.message + " \n " + task.link)
                          }
                        >
                          📋 Copy Message
                        </button>
                        <button
                          className="flex-1 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition"
                          onClick={() =>
                            handleSendWhatsApp(task.message + "\n" + task.link)
                          }
                        >
                          📲 Send via WhatsApp
                        </button>
                        <button
                          className="flex-1 bg-purple-500 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition"
                          onClick={() =>
                            handleBroadcastWhatsApp(task.message + "\n" + task.link)
                          }
                        >
                          📣 Broadcast via WhatsApp
                        </button>
                      </div>
                      <button
                        className="mt-4 w-full bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
                        onClick={() => handleNextStepForTask(task.id)}
                      >
                        ⏭️ Proceed to Next Step for Task {task.title}
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
