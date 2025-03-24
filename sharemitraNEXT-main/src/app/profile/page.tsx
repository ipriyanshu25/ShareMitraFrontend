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
            minLength={10}
            maxLength={10}
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
      </div>
    </div>
  );
};

export default Profile;
