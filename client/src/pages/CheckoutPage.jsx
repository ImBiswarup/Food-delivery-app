import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { selectedItem, quantity } = location.state || {};

  const handlePayment = () => {
    // Logic for handling payment
    console.log('Proceeding to payment for:', selectedItem, 'Quantity:', quantity);
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
              src="/docs/images/blog/image-1.jpg" 
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
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
          </form>
        </div>

        <div className="flex justify-between items-center">
          <Link to="/" className="text-blue-600 hover:underline">Back to Menu</Link>
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
