import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const location = useLocation();
  const { selectedItem, quantity } = location.state || {};

  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user?.name || ''); // Initialize with user name
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = () => {
    console.log(
      'Proceeding to payment for:',
      selectedItem.name,
      'price:',
      selectedItem.price * quantity,
      'Quantity:',
      quantity,
      'to',
      fullName,
      address
    );
    // Add payment logic here
  };

  if (!selectedItem) {
    return <div>No item selected.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center mb-2">
            <img
              src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1724310827/burger_lyy4b3.jpg"
              alt={selectedItem.name}
              className="w-20 h-20 rounded-lg object-cover mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{selectedItem.name}</h2>
              <p className="text-gray-600">Rs.{selectedItem.price}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Quantity:</p>
            <p className="text-gray-800 font-bold">{quantity}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600">Total Price:</p>
            <p className="text-gray-800 font-bold">Rs.{selectedItem.price * quantity}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </form>
        </div>

        <div className="flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Menu
          </Link>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
