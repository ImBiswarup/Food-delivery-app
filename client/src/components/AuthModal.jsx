import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ isVisible, onClose }) => {
  const {
    signin,
    login,
    error,
    name,
    email,
    password,
    role,
    setPassword,
    setEmail,
    setName,
    setRole,
  } = useAuth();

  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsSignup(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const success = await signin();

      if (success !== false) {
        setIsSignup(false);
      }
    } else {
      await login();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {isSignup && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
        )}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex flex-col items-center">
          <button
            type="button"
            className="px-4 py-2 text-blue-600 hover:underline mb-4"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Log in"
              : "Need an account? Sign up"}
          </button>

          <div className="flex justify-between w-full">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              onClick={onClose}
            >
              Close
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {isSignup ? "Create Account" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
