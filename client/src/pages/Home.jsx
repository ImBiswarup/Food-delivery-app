import React, { useEffect, useState } from 'react';
import OrderModal from '../components/OrderModal';

import { useItem } from '../context/ItemContext';


const Home = () => {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const { food, getItems, loading, error } = useItem();

    useEffect(() => {
        getItems();
    }, []);

    // const apiUrl = process.env.VITE_API_BASE_URL;
    // console.log(apiUrl); 
    
    // console.log(food[0]?._id);

    // const getItems = async () => {
    //     const response = await axios.get('http://localhost:3000/api/item/get-items')

    //     // setFood(response.data)

    //     console.log(response.data.items);
    // }

    // getItems()

    const handleOrderClick = (item) => {
        setSelectedItem(item);
        setIsOrderModalOpen(true);
    };

    const handleOrderModalClose = () => {
        setIsOrderModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div className="p-8 bg-gray-100 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {food.map((item) => (
                        <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <a href={item._id} className="relative">
                                <img className="w-full h-48 object-cover"
                                    // src={item.imageUrl}
                                    src='https://res.cloudinary.com/djrdw0sqz/image/upload/v1724310827/burger_lyy4b3.jpg'
                                    alt={item.name} />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
                                    <h3 className="text-white text-xl font-bold">{item.name}</h3>
                                    <p className="text-white text-lg font-semibold">Rs.{item.price}</p>
                                </div>
                            </a>
                            <div className="p-6">
                                <p className="text-gray-700 mb-4">{item.description}</p>
                                <button
                                    onClick={() => handleOrderClick(item)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300"
                                >
                                    Order Now
                                    <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedItem && (
                <OrderModal
                    isVisible={isOrderModalOpen}
                    onClose={handleOrderModalClose}
                    foodItems={[selectedItem]}
                />
            )}
        </>
    );
}

export default Home;
