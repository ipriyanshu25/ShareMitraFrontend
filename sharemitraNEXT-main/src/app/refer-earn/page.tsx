"use client";

import React from "react";

// Example referral link – replace with the link you generate for each user
const REFERRAL_LINK = "https://example.com?ref=ABC123";

const ReferEarn: React.FC = () => {
  const handleWhatsAppShare = () => {
    // Encode the message for WhatsApp
    const message = encodeURIComponent(
      `Hey! Check out this awesome app and earn rewards with me!\n\nUse my referral link: ${REFERRAL_LINK}`
    );

    // Open WhatsApp share URL in a new tab
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Refer & Earn</h2>

      <p className="text-gray-600 mb-4 text-center">
        Invite your friends and earn rewards when they sign up using your referral link!
      </p>

      <div className="bg-gray-100 rounded-md p-4 mb-6 text-center">
        <p className="mb-2 text-gray-700 font-semibold">Your Referral Link:</p>
        <p className="break-all text-blue-600 font-medium">{REFERRAL_LINK}</p>
      </div>

      <button
        onClick={handleWhatsAppShare}
        className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Share on WhatsApp
      </button>
    </div>
  );
};

export default ReferEarn;
