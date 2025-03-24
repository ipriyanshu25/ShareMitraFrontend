// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// interface Task {
//   id: string;
//   title: string;
//   message: string;
//   link: string;
//   created_at: string;
//   isNew: number;
// }

// const HomePage: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [expandedTask, setExpandedTask] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchTasks() {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/task/tasks");
//         const data = await response.json();
//         if (data.status === 1 && data.tasks) {
//           const fetchedTasks: Task[] = data.tasks.map((task: any) => ({
//             id: task.id,
//             title: task.title,
//             message: task.message,
//             link: task.link,
//             created_at: task.created_at,
//             isNew: task.isNew,
//           }));
//           // Optional: sort tasks by created_at descending
//           const sortedTasks = fetchedTasks.sort(
//             (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//           );
//           setTasks(sortedTasks);
//         } else {
//           setTasks([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch tasks", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTasks();
//   }, []);

//   const handleCopyMessage = (message: string) => {
//     navigator.clipboard.writeText(message);
//     alert("Message copied!");
//   };

//   const handleSendWhatsApp = (message: string) => {
//     const encodedMessage = encodeURIComponent(message);
//     window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
//   };

//   const handleBroadcastWhatsApp = (message: string) => {
//     // This function opens WhatsApp with the message pre-filled.
//     // The user can then choose a broadcast list manually within WhatsApp.
//     const encodedMessage = encodeURIComponent(message);
//     window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
//   };

//   // Proceed to Next Step for a specific task
//   const handleNextStepForTask = (taskId: string) => {
//     window.location.href = `/home/taskupload?taskId=${taskId}`;
//   };

//   const toggleTask = (taskId: string) => {
//     setExpandedTask(expandedTask === taskId ? null : taskId);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-green-50 text-center">
//       <div className="flex flex-col items-center flex-grow p-6 mt-16 w-full max-w-3xl mx-auto">
//         <motion.h1
//           className="text-4xl font-bold text-green-900 mb-4"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Welcome to ShareMitra!
//         </motion.h1>

//         <motion.p
//           className="text-lg text-green-700 mb-6"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Earn money effortlessly by completing simple tasks. Follow the steps
//           below and start earning now! 🚀
//         </motion.p>

//         {/* Task Section */}
//         <div className="bg-white p-6 rounded-xl shadow-lg w-full border border-gray-200">
//           {loading ? (
//             <p>Loading tasks...</p>
//           ) : tasks.length === 0 ? (
//             <p>No tasks available</p>
//           ) : (
//             tasks.map((task) => {
//               const showNewIcon = task.isNew === 1;
//               return (
//                 <div
//                   key={task.id}
//                   className="mb-4 border-b border-gray-300 pb-4"
//                 >
//                   <button
//                     className="w-full text-left text-xl font-semibold text-gray-800 flex justify-between items-center"
//                     onClick={() => toggleTask(task.id)}
//                   >
//                     <span className="flex items-center">
//                       Task - {task.title}
//                       {showNewIcon && (
//                         <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
//                           NEW
//                         </span>
//                       )}
//                     </span>
//                     <span>{expandedTask === task.id ? "▲" : "▼"}</span>
//                   </button>

//                   {/* Expanded Task Details */}
//                   {expandedTask === task.id && (
//                     <div className="mt-4 text-gray-600">
//                       <p className="mb-2">{task.message}</p>
//                       <a
//                         href={task.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="mb-4 text-blue-500 underline"
//                       >
//                         {task.link}
//                       </a>
//                       <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//                         <button
//                           className="flex-1 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
//                           onClick={() =>
//                             handleCopyMessage(task.message + " \n " + task.link)
//                           }
//                         >
//                           📋 Copy Message
//                         </button>
//                         <button
//                           className="flex-1 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition"
//                           onClick={() =>
//                             handleSendWhatsApp(task.message + "\n" + task.link)
//                           }
//                         >
//                           📲 Send via WhatsApp
//                         </button>
//                         <button
//                           className="flex-1 bg-purple-500 text-white px-5 py-3 rounded-lg hover:bg-purple-600 transition"
//                           onClick={() =>
//                             handleBroadcastWhatsApp(task.message + "\n" + task.link)
//                           }
//                         >
//                           📣 Broadcast via WhatsApp
//                         </button>
//                       </div>
//                       <button
//                         className="mt-4 w-full bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
//                         onClick={() => handleNextStepForTask(task.id)}
//                       >
//                         ⏭️ Proceed to Next Step for Task {task.title}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// interface Task {
//   id: string;
//   title: string;
//   message: string;
//   link: string;
//   created_at: string;
//   isNew: number;
// }

// const HomePage: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [expandedTask, setExpandedTask] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchTasks() {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/task/tasks");
//         const data = await response.json();
//         if (data.status === 1 && data.tasks) {
//           const fetchedTasks: Task[] = data.tasks.sort(
//             (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//           );
//           setTasks(fetchedTasks);
//         } else {
//           setTasks([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch tasks", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTasks();
//   }, []);

//   const handleCopyMessage = (message: string) => {
//     navigator.clipboard.writeText(message);
//     alert("Message copied!");
//   };

//   const handleSendWhatsApp = (message: string) => {
//     window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
//   };

//   const handleNextStepForTask = (taskId: string) => {
//     window.location.href = `/home/taskupload?taskId=${taskId}`;
//   };

//   const toggleTask = (taskId: string) => {
//     setExpandedTask(expandedTask === taskId ? null : taskId);
//   };

//   return (
//     <div className="min-h-screen bg-green-50 text-gray-800">
//       {/* Hero Section */}
//       <div className="text-center py-35 px-6 bg-green-200">
//         <motion.h1 className="text-5xl font-bold text-green-900 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//           Welcome to ShareMitra
//         </motion.h1>
//         <motion.p className="text-lg text-green-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
//           Earn money effortlessly by completing simple online tasks. 🚀
//         </motion.p>
//       </div>

//       {/* About Section */}
//       <div className="max-w-4xl mx-auto my-12 px-6">
//         <h2 className="text-3xl font-semibold mb-4">About ShareMitra</h2>
//         <p className="text-gray-700">
//           ShareMitra is an innovative platform where users can easily earn rewards by sharing provided content on social platforms. Engage, share, and grow your income!
//         </p>
//       </div>

//       {/* Tasks Section */}
//       <div className="max-w-4xl mx-auto px-6 mb-12">
//         <h2 className="text-3xl font-semibold mb-4">Available Tasks</h2>
//         {loading ? (
//           <p>Loading tasks...</p>
//         ) : tasks.length === 0 ? (
//           <p>No tasks available right now. Please check again later.</p>
//         ) : (
//           tasks.map((task) => (
//             <div key={task.id} className="mb-4 bg-white rounded-lg shadow border border-gray-300 p-4">
//               <button className="w-full flex justify-between items-center" onClick={() => toggleTask(task.id)}>
//                 <span className="text-xl font-semibold">{task.title}</span>
//                 <span>{expandedTask === task.id ? "▲" : "▼"}</span>
//               </button>

//               {expandedTask === task.id && (
//                 <div className="mt-4">
//                   <p>{task.message}</p>
//                   <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                     Visit Link
//                   </a>
//                   <div className="flex gap-4 mt-4">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleCopyMessage(task.message + "\n" + task.link)}>
//                       Copy Message
//                     </button>
//                     <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSendWhatsApp(task.message + "\n" + task.link)}>
//                       Share on WhatsApp
//                     </button>
//                   </div>
//                   <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded" onClick={() => handleNextStepForTask(task.id)}>
//                     Proceed to Task
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="text-center py-6 bg-green-200 bottom-fixed">
//         <p className="text-green-800">© 2024 ShareMitra. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;





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
          const fetchedTasks: Task[] = data.tasks.sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setTasks(fetchedTasks);
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
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleNextStepForTask = (taskId: string) => {
    window.location.href = `/home/taskupload?taskId=${taskId}`;
  };

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-gray-800">
      <div className="text-center py-35 px-6 bg-green-200">
        <motion.h1
          className="text-5xl font-bold text-green-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to ShareMitra
        </motion.h1>
        <motion.p
          className="text-lg text-green-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Earn money effortlessly by completing simple online tasks. 🚀
        </motion.p>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto my-12 px-6">
        <h2 className="text-3xl font-semibold mb-4">About ShareMitra</h2>
        <p className="text-gray-700">
          ShareMitra is an innovative platform where users can easily earn rewards by sharing provided content on social platforms. Engage, share, and grow your income!
        </p>
      </div>

      {/* Tasks Section */}
      <div className="flex-grow max-w-4xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Available Tasks</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks available right now. Please check again later.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="mb-6 bg-white rounded-lg shadow border border-gray-300 p-6 min-h-[100px] min-w-[600px] transition transform hover:scale-105 hover:shadow-lg"
            >
              <button
                className="w-full flex justify-between items-center hover:cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                <span className="text-xl font-semibold flex items-center">
                  {task.title}
                  {task.isNew === 1 && (
                    <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                      NEW
                    </span>
                  )}
                </span>
                <span>{expandedTask === task.id ? "▲" : "▼"}</span>
              </button>

              {expandedTask === task.id && (
                <div className="mt-4">
                  <p>{task.message}</p>
                  <a
                    href={task.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mt-2"
                  >
                    {task.link}
                  </a>
                  {expandedTask === task.id && (
                    <div>
                      <div className="flex gap-4 mt-4">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleCopyMessage(task.message + "\n" + task.link)}
                        >
                          Copy Message
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          onClick={() => handleSendWhatsApp(task.message + "\n" + task.link)}
                        >
                          Share on WhatsApp
                        </button>
                      </div>
                      <button
                        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={() => handleNextStepForTask(task.id)}
                      >
                        Proceed to Task
                      </button>
                    </div>
                  )}
                </div>
              )}</div>
          ))
        )}
      </div>

      <footer className="text-center py-6 bg-green-200">
        <p className="text-green-800">© 2024 ShareMitra. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
