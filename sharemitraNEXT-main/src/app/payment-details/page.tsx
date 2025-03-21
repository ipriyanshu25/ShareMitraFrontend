"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

const PaymentPage: React.FC = () => {
  // State for the selected payment method (bank or upi)
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "upi">("bank");

  // State for bank account details
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
  });

  // State for UPI details
  const [upiDetails, setUpiDetails] = useState({
    upiId: "",
  });

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value as "bank" | "upi");
  };

  const handleBankInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiDetails({
      ...upiDetails,
      upiId: e.target.value,
    });
  };

  // Fetch bank name from IFSC code when user leaves the IFSC field
  const handleIfscBlur = async () => {
    const ifsc = bankDetails.ifsc.trim();
    if (ifsc !== "") {
      try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
        if (response.ok) {
          const data = await response.json();
          // Update bank name with the fetched BANK field from API response
          setBankDetails((prev) => ({ ...prev, bankName: data.BANK }));
        } else {
          setBankDetails((prev) => ({ ...prev, bankName: "" }));
          Swal.fire({
            title: "Error",
            text: "Invalid IFSC Code",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        setBankDetails((prev) => ({ ...prev, bankName: "" }));
        Swal.fire({
          title: "Error",
          text: "Error fetching bank details",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation for bank details
    if (paymentMethod === "bank") {
      const accountNumberRegex = /^[0-9]{9,18}$/; // Assumed valid range for account numbers
      if (!accountNumberRegex.test(bankDetails.accountNumber)) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid account number (9 to 18 digits).",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (!bankDetails.accountHolder.trim()) {
        Swal.fire({
          title: "Error",
          text: "Account holder name is required.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (!bankDetails.ifsc.trim()) {
        Swal.fire({
          title: "Error",
          text: "IFSC code is required.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      if (!bankDetails.bankName.trim()) {
        Swal.fire({
          title: "Error",
          text: "Bank name could not be fetched. Please check the IFSC code.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    } else {
      // Validation for UPI details
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiRegex.test(upiDetails.upiId.trim())) {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid UPI ID (e.g., username@bank).",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    // Prepare the payload based on the payment method
    let payload;
    if (paymentMethod === "bank") {
      payload = {
        paymentMethod: "bank",
        accountHolder: bankDetails.accountHolder,
        accountNumber: bankDetails.accountNumber,
        ifsc: bankDetails.ifsc,
        bankName: bankDetails.bankName,
      };
    } else {
      payload = {
        paymentMethod: "upi",
        upiId: upiDetails.upiId,
      };
    }

    try {
      // POST the payment details to the Flask backend API
      const response = await fetch(
        "http://127.0.0.1:5000/payment/payment-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.msg,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting payment details:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting the payment details.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Select Payment Method:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="bank"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="bank">Bank Account</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="upi"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="upi">UPI</label>
            </div>
          </div>

          {paymentMethod === "bank" ? (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="accountHolder"
                  className="block text-sm font-medium mb-1"
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="accountHolder"
                  name="accountHolder"
                  value={bankDetails.accountHolder}
                  onChange={handleBankInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={handleBankInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ifsc"
                  className="block text-sm font-medium mb-1"
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="ifsc"
                  name="ifsc"
                  value={bankDetails.ifsc}
                  onChange={handleBankInputChange}
                  onBlur={handleIfscBlur}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bankName"
                  className="block text-sm font-medium mb-1"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={bankDetails.bankName}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-200"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="upiId" className="block text-sm font-medium mb-1">
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={upiDetails.upiId}
                onChange={handleUpiInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit Payment Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
