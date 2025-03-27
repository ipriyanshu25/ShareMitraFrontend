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
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Typing animation for "ShareMitra"
  const heading = "ShareMitra";
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://127.0.0.1:5000/task/tasks");
        const data = await response.json();
        if (data.status === 200 && data.tasks) {
          const sortedTasks: Task[] = data.tasks.sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setTasks([sortedTasks[0]]); // Only newest one
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  // Typing animation logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (charIndex < heading.length) {
      timeout = setTimeout(() => {
        setTypedText((prev) => prev + heading[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 150);
    } else {
      timeout = setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
      }, 2000); // Restart after delay
    }

    return () => clearTimeout(timeout);
  }, [charIndex]);

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

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-gray-800 font-[Poppins]">
      {/* Hero Section */}
      <div className="text-center py-24 px-6 bg-gradient-to-br from-green-200 to-green-100">
        <h1 className="text-6xl md:text-7xl font-extrabold text-green-900 font-serif tracking-wide">
          {typedText}
          <span className="animate-pulse text-green-800">|</span>
        </h1>
        <p className="text-2xl mt-6 text-green-800 font-semibold">
          Earn money effortlessly by completing simple online tasks. 🚀
        </p>
      </div>

      {/* About Section with autoplay video */}
      <div id="about" className="w-full bg-white py-16 px-6">
        <h2 className="text-4xl font-bold mb-8 text-left text-green-800">About</h2>
        <div className="w-full h-[450px] overflow-hidden rounded-xl shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/MpsobHw-2kg?autoplay=1&mute=1&controls=1&rel=0"
            title="Vedic Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Tasks Section */}
      <div id="tasks" className="max-w-6xl mx-auto px-6 mb-20 w-full">
        <h2 className="text-4xl font-bold mb-8 text-left text-green-900">Available Tasks</h2>
        {loading ? (
          <p>Loading latest task...</p>
        ) : !isLoggedIn ? (
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
            <p className="text-xl text-gray-600 flex items-center gap-2">
              🔒 Please <strong>login</strong> to view tasks.
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <p>No tasks available right now. Please check again later.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-green-800">{tasks[0].title}</h3>
              <p className="mt-4 text-gray-700 whitespace-pre-wrap">{tasks[0].message}</p>
              <a
                href={tasks[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                {tasks[0].link}
              </a>

              <div className="flex gap-4 mt-6 flex-wrap">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    handleCopyMessage(tasks[0].message + "\n" + tasks[0].link)
                  }
                >
                  Copy Message
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    handleSendWhatsApp(tasks[0].message + "\n" + tasks[0].link)
                  }
                >
                  Share on WhatsApp
                </button>
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                  onClick={() => handleNextStepForTask(tasks[0].id)}
                >
                  Proceed to Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center py-6 bg-green-200">
        <p className="text-green-800">© 2025 ShareMitra. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
