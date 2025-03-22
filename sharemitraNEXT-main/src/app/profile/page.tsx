"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface ProfileType {
  _id: number;
  fullName: string;
  email: string;
  phonenumber: string;
}

const Profile: React.FC = () => {
  // State for profile details; note the added _id field.
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    _id: 0,
    fullName: "",
    email: "",
    phonenumber: "",
  });

  // State for password update
  const [passwordUpdate, setPasswordUpdate] = useState({
    old_password: "",
    new_password: "",
  });

  // On component mount, fetch profile details from backend using stored _id.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Use the user's _id for fetching profile details
      fetch(`http://localhost:5000/user/profile?id=${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 1) {
            setProfile(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            console.error("Error fetching profile:", data.msg);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.msg,
            });
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error fetching profile.",
          });
        });
    }
  }, []);

  // Handle changes for profile details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for password update fields
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordUpdate((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile details by calling the backend API.
  // The payload includes the _id.
  const handleSave = () => {
    fetch("http://localhost:5000/user/update_details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("user", JSON.stringify(profile));
          setIsEditing(false);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Profile updated successfully.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating profile.",
        });
      });
  };

  // Update password by calling the backend API.
  // The payload includes _id, old_password, and new_password.
  const handlePasswordUpdate = () => {
    fetch("http://localhost:5000/user/update_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: profile._id,
        old_password: passwordUpdate.old_password,
        new_password: passwordUpdate.new_password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 || data.status === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password updated successfully.",
          });
          setPasswordUpdate({
            old_password: "",
            new_password: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.error("Error updating password:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating password.",
        });
      });
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Profile
      </h2>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors ${
              isEditing
                ? "border-gray-300 bg-white"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors ${
              isEditing
                ? "border-gray-300 bg-white"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            name="phonenumber"
            value={profile.phonenumber}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors ${
              isEditing
                ? "border-gray-300 bg-white"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Edit / Update Buttons for Profile Details */}
        <div className="flex justify-between">
          {isEditing ? (
            <div>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Password Update Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Change Password
          </h3>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600 font-semibold">
              Old Password
            </label>
            <input
              type="password"
              name="old_password"
              value={passwordUpdate.old_password}
              onChange={handlePasswordChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600 font-semibold">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              value={passwordUpdate.new_password}
              onChange={handlePasswordChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300 bg-white"
            />
          </div>
          <button
            onClick={handlePasswordUpdate}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
