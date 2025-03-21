"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface User {
  name: string;
  profileImage: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // State Hooks
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Effect Hook (called unconditionally)
  useEffect(() => {
    // If we are on the login page, skip loading user data
    if (pathname === "/login") {
      return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({ name: parsedUser.fullName, profileImage: "/placeholder.jpg" });
    }
  }, [pathname]);

  // Conditionally return null AFTER all hooks have been called
  if (pathname === "/login") {
    return null;
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Brand & Logo */}
        <div onClick={() => router.push("/home")} className="flex items-center space-x-2 cursor-pointer">
          <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-semibold text-blue-500 dark:text-blue-400">
            Sharemitra
          </span>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              {/* Avatar & Name Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-2 focus:outline-none"
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-700 font-medium">
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/profile");
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/payment-details");
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Payment Details
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/task-status");
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Task Status
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/contact");
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Contact Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/payment-status");
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Payment Status
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/refer-earn");
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Refer & Earn
                      </button>
                    </li>
                    <li>
                      <hr className="my-1 border-gray-300" />
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
              onClick={() => router.push("/login")}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
