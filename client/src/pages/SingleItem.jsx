import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FoodItems } from '../../public/FoodItems';
import OrderModal from '../components/OrderModal';

const SingleItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const item = FoodItems.find(foodItem => foodItem.id === parseInt(id, 10));

    const relatedItems = FoodItems.filter(foodItem =>
        foodItem.id !== item.id &&
        foodItem.tags.some(tag => item.tags.includes(tag))
    );

    if (!item) {
        return <div className="text-center mt-8">Item not found</div>;
    }

    const handleOrderClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleViewDetailsClick = (relatedItemId) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/${relatedItemId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="bg-white shadow-2xl rounded-3xl w-full md:w-3/4 overflow-hidden mb-12 transform transition-transform hover:scale-105 duration-500">
                <img
                    // src={item.imageUrl || "/docs/images/blog/image-1.jpg"}
                    src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1724310827/burger_lyy4b3.jpg"
                    alt={item.name}
                    className="w-full h-72 object-cover rounded-t-3xl"
                />
                <div className="p-8">
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{item.name}</h1>
                    <p className="text-3xl text-gray-800 mb-6">Rs.{item.price}</p>
                    <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>

                    <button
                        onClick={handleOrderClick}
                        className="w-full px-5 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
                    >
                        Order Now
                        <svg className="inline w-6 h-6 ml-2 -mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-3xl w-full md:w-3/4 p-8 mb-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Reviews</h2>
                {item.reviews && item.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                        {item.reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-800 font-semibold">{review.user}</p>
                                        <div className="flex items-center">
                                            <p className="text-yellow-500 text-lg">{'⭐'.repeat(review.rating)}</p>
                                            <p className="ml-2 text-gray-500">{review.rating}/5</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {relatedItems.length > 0 && (
                <div className="w-full mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedItems.map(relatedItem => (
                            <div key={relatedItem.id} className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                <img
                                    // src={relatedItem.imageUrl || "/docs/images/blog/image-1.jpg"}
                                    src="https://res.cloudinary.com/djrdw0sqz/image/upload/v1724310827/burger_lyy4b3.jpg"
                                    alt={relatedItem.name}
                                    className="w-full h-40 object-cover rounded-t-3xl"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedItem.name}</h3>
                                    <p className="text-gray-700 mb-4">Rs.{relatedItem.price}</p>
                                    <button
                                        onClick={() => handleViewDetailsClick(relatedItem.id)}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
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
