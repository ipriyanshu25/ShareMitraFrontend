"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phonenumber: string;
}

interface Errors {
  [key: string]: string;
}

// Utility function to check password requirements
function checkPasswordRequirements(password: string) {
  return {
    length: password.length >= 8 && password.length <= 16,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

function Login() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // Show/hide password (Sign-up only)
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Validate login fields
  const validateLogin = (): boolean => {
    const tempErrors: Errors = {};
    if (!loginData.email) tempErrors.email = "Email is required";
    if (!loginData.password) tempErrors.password = "Password is required";
    else if (loginData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Validate signup fields
  const validateSignup = (): boolean => {
    const tempErrors: Errors = {};
    if (!signupData.fullName) tempErrors.fullName = "Full Name is required";
    if (!signupData.email) tempErrors.email = "Email is required";
    if (!signupData.phonenumber) tempErrors.phone = "Phone number is required";
    if (!signupData.password) {
      tempErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle input changes for login or signup
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Submit form data to backend
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = isLogin
      ? "http://127.0.0.1:5000/login"
      : "http://127.0.0.1:5000/register";
    const data = isLogin ? loginData : signupData;

    if (!recaptchaToken) {
      alert("Please verify that you are not a robot!");
      return;
    }

    if (isLogin ? validateLogin() : validateSignup()) {
      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Success:", response.data);
        if (isLogin) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("isLoggedIn", "true");
          router.push("/home");
        }
      } catch (error: any) {
        console.error(
          "Error:",
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  // Check password requirements in real-time for sign-up
  const passwordChecks = checkPasswordRequirements(signupData.password);

  // Helper for styling requirement checks
  const reqClass = (condition: boolean) =>
    condition ? "text-green-600" : "text-red-600";

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2BCC9]">
      {/* Container card */}
      <div className="bg-white shadow-lg rounded-[15px] flex flex-col md:flex-row w-3/4 md:w-1/2 overflow-hidden">
        {/* Mobile toggle (Login | Sign Up) */}
        <div className="flex md:hidden justify-center p-3">
          <div
            className="cursor-pointer px-5 py-2 border border-[#DE4C71]"
            style={{
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              backgroundColor: isLogin ? "#DE4C71" : "#fff",
              color: isLogin ? "#fff" : "#DE4C71",
            }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            className="cursor-pointer px-5 py-2 border border-[#DE4C71]"
            style={{
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              backgroundColor: !isLogin ? "#DE4C71" : "#fff",
              color: !isLogin ? "#fff" : "#DE4C71",
            }}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </div>
        </div>

        {/* Left Panel (Desktop) */}
        <div
          className="hidden md:flex flex-col items-center justify-center p-5 w-1/2"
          style={{
            color: "#444",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            background: "linear-gradient(to bottom, #ffffff, #D6204E)",
          }}
        >
          <h3>{isLogin ? "New Here?" : "Already have an account?"}</h3>
          <button
            className="mt-3 px-4 py-2 bg-white text-[#ff66b2] rounded"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        {/* Right Panel */}
        <div
          className="p-5 w-full md:w-1/2"
          style={{ borderRadius: "15px 15px 0 0" }}
        >
          <h2
            className="mb-4 text-center text-2xl font-semibold"
            style={{ color: "#ff66b2" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name (Signup Only) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={signupData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.fullName && (
                  <small className="text-red-600">{errors.fullName}</small>
                )}
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={isLogin ? loginData.email : signupData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              />
              {errors.email && (
                <small className="text-red-600">{errors.email}</small>
              )}
            </div>

            {/* Phone Number (Signup Only) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <span className="bg-gray-200 px-3 py-2 text-gray-600 flex items-center">
                    +91
                  </span>
                  <input
                    type="text"
                    name="phonenumber"
                    className="flex-1 p-2 outline-none"
                    placeholder="Enter phone number"
                    maxLength={10}
                    minLength={10}
                    value={signupData.phonenumber}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && (
                  <small className="text-red-600">{errors.phone}</small>
                )}
              </div>
            )}

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1">
                Password <span className="text-red-500">*</span>
              </label>

              {/* This container only wraps the input & icon, so the button is centered to the input's height */}
              <div className="relative">
                <input
                  type={isLogin ? "password" : showSignUpPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={isLogin ? loginData.password : signupData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 pr-10"
                />

                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle Password Visibility"
                  >
                    {showSignUpPassword ? (
                      <FaRegEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaRegEye className="w-5 h-5" />
                    )}
                  </button>
          
              </div>

              {/* Error message remains below the input */}
              {errors.password && (
                <small className="text-red-600">{errors.password}</small>
              )}
            </div>


            {/* Password Requirements (Sign Up Only) */}
            {!isLogin && (
              <div className="mb-4 text-sm">
                <p className={reqClass(passwordChecks.length)}>
                  • 8-16 characters
                </p>
                <p className={reqClass(passwordChecks.uppercase)}>
                  • At least 1 uppercase letter
                </p>
                <p className={reqClass(passwordChecks.lowercase)}>
                  • At least 1 lowercase letter
                </p>
                <p className={reqClass(passwordChecks.number)}>
                  • At least 1 number
                </p>
                <p className={reqClass(passwordChecks.special)}>
                  • At least 1 special character
                </p>
              </div>
            )}

            {/* reCAPTCHA (Responsive) */}
            <div className="flex justify-center mb-4 p-3">
              <div className="transform scale-90 md:scale-100 origin-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
                  onChange={(token) => setRecaptchaToken(token)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded text-white"
              style={{ backgroundColor: "#DE4C71" }}
              disabled={!recaptchaToken}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
