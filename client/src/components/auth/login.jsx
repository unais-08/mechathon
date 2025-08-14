import React, { useState, useEffect } from "react";

import AdminDashboard from "@/components/auth/admin-dashboard";
import AdminAuthForm from "@/components/auth/admin-auth-form";
import makeAPICall from "@/utils/make-api-call";

const AdminAuthSystem = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adminData, setAdminData] = useState(null);

  const BaseURL = "http://localhost:8080/api";
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminInfo = localStorage.getItem("adminData");

    if (token && adminInfo) {
      setIsAuthenticated(true);
      setAdminData(JSON.parse(adminInfo));
    }
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await makeAPICall(
        `${BaseURL}/admin/login`,
        "POST",
        loginForm
      );
      console.log("Login API Response:", result);
      // Store token and admin data
      localStorage.setItem("adminToken", result.data?.token);
      console.log("TOKEN:", result.data?.token);

      localStorage.setItem("adminData", JSON.stringify(result.data?.admin));
      console.log("ADMIN DATA:", result.data?.admin);
      setIsAuthenticated(true);
      setAdminData(result.data?.admin);
      setSuccess("Login successful! Welcome back.");

      // Clear form
      setLoginForm({ email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = registerForm;
      const result = await makeAPICall(
        `${BaseURL}/admin/register`,
        "POST",
        registerData
      );

      setSuccess("Registration successful! You can now login.");

      // Clear form and switch to login tab
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Auto switch to login tab after successful registration
      setTimeout(() => {
        document.querySelector('[data-tab="login"]')?.click();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setIsAuthenticated(false);
    setAdminData(null);
    setLoginForm({ email: "", password: "" });
    setSuccess("Logged out successfully");
  };

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return (
      <AdminDashboard
        handleLogout={handleLogout}
        success={success}
        adminData={adminData}
      />
    );
  }

  // Authentication Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mechanical Engineering Club
          </h1>
          <p className="text-gray-600">Admin Access Portal</p>
        </div>

        <AdminAuthForm
          error={error}
          success={success}
          loginForm={loginForm}
          registerForm={registerForm}
          setLoginForm={setLoginForm}
          setRegisterForm={setRegisterForm}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          loading={loading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2025 Mechanical Engineering Club</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthSystem;
