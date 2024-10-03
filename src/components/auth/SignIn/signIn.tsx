"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [sup_contact, setSupContact] = useState("");
  const [sup_password, setSupPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sup_contact, sup_password }),
      });

      if (res.ok) {
        console.log("Login successful");
        router.push("/dashboard")

        // Handle successful login
      } else {
        const data = await res.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-100 container d-flex align-items-center">
      <form
        onSubmit={handleSubmit}
        className="form w-100 px-20 py-9"
        id="kt_login_signin_form"
      >
        <div className="text-center mb-11">
          <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
        </div>

        {/* Username Field */}
        <div className="fv-row mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Username
          </label>
          <input
            id="contact"
            type="text"
            className="form-control"
            value={sup_contact}
            onChange={(e) => setSupContact(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>

        {/* Password Field */}
        <div className="fv-row mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={sup_password}
            onChange={(e) => setSupPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid mb-10">
          <button
            type="submit"
            className="btn bg-blue text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
