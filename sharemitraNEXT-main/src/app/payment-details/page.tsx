"use client";

import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paymentMethod === "bank") {
      console.log("Submitting Bank Details:", bankDetails);
      // Submit bankDetails to your backend API
    } else {
      console.log("Submitting UPI Details:", upiDetails);
      // Submit upiDetails to your backend API
    }
    alert("Payment details submitted!");
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
                  onChange={handleBankInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
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
