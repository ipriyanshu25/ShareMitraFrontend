"use client";

import React, { useRef, useState } from "react";

const TaskUpload: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  // Use refs typed as HTMLInputElement | null
  const fileInput1Ref = useRef<HTMLInputElement | null>(null);
  const fileInput2Ref = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0];
    setError(""); // clear any previous errors
    if (file) {
      setImage(file);
    }
  };

  // Accept a RefObject<HTMLInputElement | null>
  const removeImage = (
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    fileInputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    setImage(null);

    // Also reset the file input so the UI text clears
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    // Validate that both images have been selected
    if (!image1 || !image2) {
      setError("Please select both screenshots before submitting.");
      return;
    }

    // Start the "verifying" process
    setIsVerifying(true);
    setError("");

    // Simulate an async verification (e.g. API call)
    setTimeout(() => {
      // End verification & proceed with next steps (redirect, show success, etc.)
      setIsVerifying(false);
      alert("Verification complete!");
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      {/* Overlay (shown when verifying) */}
      {isVerifying && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Please wait while we are verifying your screenshot
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto" />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Upload Your Task Images
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Message Screenshot */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-medium mb-2">
            Message Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInput1Ref}
            onChange={(e) => handleImageChange(e, setImage1)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {image1 && (
            <div className="relative mt-2">
              <img
                src={URL.createObjectURL(image1)}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md"
              />
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700 transition"
                onClick={() => removeImage(setImage1, fileInput1Ref)}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Broadcast List Screenshot */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-medium mb-2">
            Broadcast List Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInput2Ref}
            onChange={(e) => handleImageChange(e, setImage2)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {image2 && (
            <div className="relative mt-2">
              <img
                src={URL.createObjectURL(image2)}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md"
              />
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700 transition"
                onClick={() => removeImage(setImage2, fileInput2Ref)}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Validation Error */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
          disabled={isVerifying}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaskUpload;
