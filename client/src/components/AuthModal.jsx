import React from 'react';

const AuthModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Authentication</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={onClose}>Close</button>
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
