"use client";

import React, { useState, useEffect } from "react";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  // Fetch user data from localStorage or API (Replace with actual API call)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the updated profile to localStorage or API
    localStorage.setItem("user", JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile</h2>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={profile.fullname}
            onChange={handleChange}
            disabled={!isEditing}
            className={
              `w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors 
              ${isEditing ? "border-gray-300 bg-white" : "bg-gray-100 cursor-not-allowed"}`
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={
              `w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors 
              ${isEditing ? "border-gray-300 bg-white" : "bg-gray-100 cursor-not-allowed"}`
            }
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            value={profile.phonenumber}
            onChange={handleChange}
            disabled={!isEditing}
            className={
              `w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors 
              ${isEditing ? "border-gray-300 bg-white" : "bg-gray-100 cursor-not-allowed"}`
            }
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            disabled={!isEditing}
            className={
              `w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors 
              ${isEditing ? "border-gray-300 bg-white" : "bg-gray-100 cursor-not-allowed"}`
            }
          />
        </div>

        {/* Edit / Update Buttons */}
        <div className="flex justify-between">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
