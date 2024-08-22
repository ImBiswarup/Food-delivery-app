import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isVisible, onClose }) => {
  const { signin, login, error, name, email, password, role, setPassword, setEmail, setName, setRole, user } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
console.log(user);
  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      await signin();
    } else {
      await login();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {isSignup && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Already have an account? Log in' : 'Need an account? Sign up'}
            </button>
            <div className="flex justify-between w-full">
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
