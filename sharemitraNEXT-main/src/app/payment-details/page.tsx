"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";

interface PaymentMethod {
  _id: string;
  userId: string;
  paymentMethod: number; // 1 for bank, 0 for UPI
  accountHolder?: string;
  accountNumber?: string;
  ifsc?: string;
  bankName?: string;
  ifscDetails?: any;
  upiId?: string;
  created_at: string;
}

const PaymentPage: React.FC = () => {
  // State for selected payment method ("bank" or "upi")
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

  // State for recaptcha token
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // State for logged-in user id (fetched from localStorage)
  const [userId, setUserId] = useState<string>("");
  // State for fetched payment methods for the user
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  // State for expanded payment row (by _id)
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);
  // State for currently editing payment (if any)
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);

  // On component mount, load user id from localStorage and fetch payment methods
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user._id) {
        setUserId(user._id);
        fetchPaymentMethods(user._id);
      }
    }
  }, []);

  // Function to fetch payment methods by userId
  const fetchPaymentMethods = async (userId: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/payment/payment-details/user/${userId}`
      );
      const data = await response.json();
      if (data.status === 200) {
        setPaymentMethods(data.payments);
      } else {
        setPaymentMethods([]);
      }
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  // Handlers for input changes
  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as "bank" | "upi");
  };

  const handleBankInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpiInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpiDetails({
      ...upiDetails,
      upiId: e.target.value,
    });
  };

  // Fetch bank name from IFSC code on blur event
  const handleIfscBlur = async () => {
    const ifsc = bankDetails.ifsc.trim();
    if (ifsc !== "") {
      try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
        if (response.ok) {
          const data = await response.json();
          // Update bank name with the fetched BANK field
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

  // Handler when edit icon is clicked in table
  const handleEditPayment = (payment: PaymentMethod) => {
    setEditingPayment(payment);
    if (payment.paymentMethod === 1) {
      setPaymentMethod("bank");
      setBankDetails({
        accountHolder: payment.accountHolder || "",
        accountNumber: payment.accountNumber || "",
        ifsc: payment.ifsc || "",
        bankName: payment.bankName || "",
      });
    } else {
      setPaymentMethod("upi");
      setUpiDetails({
        upiId: payment.upiId || "",
      });
    }
    // Scroll to the form
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Handle form submission for create or update
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate fields for bank or UPI
    if (paymentMethod === "bank") {
      const accountNumberRegex = /^[0-9]{9,18}$/; // Adjust as needed
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

    // Prepare payload with userId
    let payload;
    if (paymentMethod === "bank") {
      payload = {
        _id:"",
        userId: userId,
        paymentMethod: "bank",
        accountHolder: bankDetails.accountHolder,
        accountNumber: bankDetails.accountNumber,
        ifsc: bankDetails.ifsc,
        bankName: bankDetails.bankName,
      };
    } else {
      payload = {
        _id:"",
        userId: userId,
        paymentMethod: "upi",
        upiId: upiDetails.upiId,
      };
    }

    try {
      let response, data;
      if (editingPayment) {
        response = await fetch(
          `http://127.0.0.1:5000/payment/payment-details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        data = await response.json();
        if (response.ok) {
          Swal.fire({
            title: "Success",
            text: data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          // Clear editing state and reset form
          setEditingPayment(null);
          setBankDetails({ accountHolder: "", accountNumber: "", ifsc: "", bankName: "" });
          setUpiDetails({ upiId: "" });
        } else {
          Swal.fire({
            title: "Error",
            text: data.msg,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        // Create new payment
        response = await fetch(
          "http://127.0.0.1:5000/payment/payment-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        data = await response.json();
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
      }
      // Refresh the payment methods table
      fetchPaymentMethods(userId);
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
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 mt-20">
      {/* Payment Methods Table */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-4">My Payment Methods</h2>
        {paymentMethods.length === 0 ? (
          <p>No payment methods added yet.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300 shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">Method</th>
                <th className="border px-4 py-2 text-left">Created At</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.map((payment) => (
                <React.Fragment key={payment._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100">
                    <td className="border px-4 py-2">
                      {payment.paymentMethod === 1 ? "Bank Account" : "UPI"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(payment.created_at).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {expandedPayment === payment._id ? (
                        <FaChevronUp className="inline-block" onClick={() =>
                          setExpandedPayment(
                            expandedPayment === payment._id ? null : payment._id
                          )
                        }/>
                      ) : (
                        <FaChevronDown className="inline-block" onClick={() =>
                      setExpandedPayment(
                        expandedPayment === payment._id ? null : payment._id
                      )
                    }/>
                      )}
                      <FaEdit
                        className="inline-block text-blue-500 cursor-pointer ml-3 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent triggering row expand
                          handleEditPayment(payment);
                        }}
                      />
                    </td>
                  </tr>
                  {expandedPayment === payment._id && (
                    <tr>
                      <td colSpan={4} className="border px-4 py-2 bg-gray-50">
                        {payment.paymentMethod === 1 ? (
                          <div>
                            <p>
                              <strong>Account Holder:</strong>{" "}
                              {payment.accountHolder}
                            </p>
                            <p>
                              <strong>Account Number:</strong>{" "}
                              {payment.accountNumber}
                            </p>
                            <p>
                              <strong>IFSC:</strong> {payment.ifsc}
                            </p>
                            <p>
                              <strong>Bank Name:</strong> {payment.bankName}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p>
                              <strong>UPI ID:</strong> {payment.upiId}
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Payment Form */}
      <div className="w-full max-w-md bg-white rounded shadow p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {editingPayment ? "Edit Payment Details" : "Add Payment Details"}
        </h2>
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
                <label htmlFor="accountHolder" className="block text-sm font-medium mb-1">
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
                <label htmlFor="accountNumber" className="block text-sm font-medium mb-1">
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
                <label htmlFor="ifsc" className="block text-sm font-medium mb-1">
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
                <label htmlFor="bankName" className="block text-sm font-medium mb-1">
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

          {/* reCAPTCHA */}
          <div className="flex justify-center mb-4">
            <div className="transform scale-90 md:scale-100 origin-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={!recaptchaToken}
          >
            {editingPayment ? "Update Payment Details" : "Submit Payment Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
