"use client";

import React, { useState, FormEvent } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phoneNumber: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission logic (e.g., send data to API)
    console.log("Contact form submitted:", formData);
    // Reset form fields if desired:
    // setFormData({ fullName: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter the phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 ring-blue-400 transition-colors border-gray-300"
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
