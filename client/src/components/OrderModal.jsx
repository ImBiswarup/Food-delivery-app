import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderModal = ({ isVisible, onClose, foodItems }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!isVisible) return null;

  const selectedFood = foodItems[0];

  const handlePlaceOrder = () => {
    navigate(`/${selectedFood._id}/checkout`, { state: { selectedItem: selectedFood, quantity: quantity } });
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Order {selectedFood.name}</h2> 
        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input 
              type="number" 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              min={1} 
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={handlePlaceOrder}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
