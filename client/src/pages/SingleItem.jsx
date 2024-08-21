import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FoodItems } from '../../public/FoodItems';
import OrderModal from '../components/OrderModal';

const SingleItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const item = FoodItems.find(foodItem => foodItem.id === parseInt(id, 10));

    if (!item) {
        return <div className="text-center mt-8">Item not found</div>;
    }

    const handleOrderClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const relatedItems = item.relatedItems ? 
        FoodItems.filter(foodItem => item.relatedItems.includes(foodItem.id)) :
        [];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md overflow-hidden mb-8">
                <img
                    src={item.imageUrl || "/docs/images/blog/image-1.jpg"}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{item.name}</h1>
                    <p className="text-2xl text-gray-800 mb-4">Rs.{item.price}</p>
                    <p className="text-gray-700 mb-6">{item.description}</p>

                    <button
                        onClick={handleOrderClick}
                        className="w-full px-4 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
                    >
                        Order Now
                        <svg className="inline w-5 h-5 ml-2 -mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Reviews</h2>
                {item.reviews && item.reviews.length > 0 ? (
                    item.reviews.map((review, index) => (
                        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                            <p className="text-gray-800 font-semibold">{review.user}</p>
                            <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {relatedItems.length > 0 && (
                <div className="w-full max-w-md mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {relatedItems.map(relatedItem => (
                            <div key={relatedItem.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <img
                                    src={relatedItem.imageUrl || "/docs/images/blog/image-1.jpg"}
                                    alt={relatedItem.name}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-900">{relatedItem.name}</h3>
                                    <p className="text-gray-700 mb-2">Rs.{relatedItem.price}</p>
                                    <button
                                        onClick={() => navigate(`/item/${relatedItem.id}`)}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <OrderModal 
                isVisible={isModalVisible} 
                onClose={handleCloseModal} 
                foodItems={[item]} 
            />
        </div>
    );
};

export default SingleItem;
