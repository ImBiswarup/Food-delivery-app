import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const { user } = useAuth();

    const orderedFood = [
        { id: 1, name: 'Burger', quantity: 2, total: 300 },
        { id: 2, name: 'Pizza', quantity: 1, total: 300 },
        { id: 3, name: 'Pasta', quantity: 3, total: 450 },
        { id: 4, name: 'Sushi', quantity: 1, total: 600 },
        { id: 5, name: 'Salad', quantity: 2, total: 250 },
    ];

    const subtotal = orderedFood.reduce((acc, item) => acc + item.total, 0);

    return (
        <>
            {
                user ? (
                    <div className="container mx-auto px-4 py-8 bg-gray-800 min-h-screen">
                        <div className="bg-gray-900 text-white shadow-lg rounded-lg p-8">
                            <h1 className="text-4xl font-bold mb-6">{user.user.name}</h1>
                            <div className="overflow-x-auto">
                                <h2 className="text-3xl font-semibold mb-4">Ordered Food</h2>
                                <div className="overflow-y-auto max-h-96 bg-gray-700 rounded-lg shadow-md">
                                    <table className="min-w-full divide-y divide-gray-600">
                                        <thead className="bg-gray-600">
                                            <tr>
                                                <th className="p-4 text-left text-gray-100">Item</th>
                                                <th className="p-4 text-center text-gray-100">Quantity</th>
                                                <th className="p-4 text-right text-gray-100">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                                            {orderedFood.map(item => (
                                                <tr key={item.id}>
                                                    <td className="p-4 text-gray-200">{item.name}</td>
                                                    <td className="p-4 text-center text-gray-300">{item.quantity}</td>
                                                    <td className="p-4 text-right text-gray-300">Rs.{item.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-100">Subtotal</h3>
                                    <p className="text-2xl font-bold text-gray-300 mt-2">Rs.{subtotal}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container flex items-center justify-center flex-col min-h-screen bg-gray-800">
                        <h1 className='text-5xl text-center font-bold text-white'>
                            Not Authorized
                        </h1>
                        <p className="mt-4">
                            <Link
                                to={'/'}
                                className='text-blue-400 text-2xl font-semibold hover:underline'
                            >
                                Go to main menu
                            </Link>
                        </p>
                    </div>
                )
            }
        </>
    );
}

export default ProfilePage;
