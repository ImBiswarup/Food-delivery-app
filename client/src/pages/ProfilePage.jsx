import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';


const ProfilePage = () => {
    const { user } = useAuth();
    const [orderedFood, setOrderedFood] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies] = useCookies(['token']);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (user && user.user && user.user.orders) {
            const orderedFoodItems = user.user.orders;
            setOrderedFood(orderedFoodItems);
            setName(user.user.name);
            setEmail(user.user.email);
            setRole(user.user.role);
        }
    }, [user]);

    console.log(name, email, role,);

    console.log("userID: ", user?.user.id);

    const updateUser = async () => {
        try {
            if (cookies.token) {
                const response = await axios.put(
                    `http://localhost:3000/api/user/update/${user?.user.id}`,
                    { name, email, role, id: user?.user.id },
                    {
                        headers: {
                            Authorization: `Bearer ${cookies.token}`,
                        },
                    }
                );
                console.log('User updated:', response.data);
                alert(response.data.msg);
            }
        } catch (err) {
            console.log('Error updating user:', err);
        }
    };

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateUser();
        setIsModalOpen(false);
    };

    const subtotal = orderedFood.reduce((acc, item) => acc + (item.food.price * item.quantity), 0);

    return (
        <>
            {user ? (
                <div className="container mx-auto px-4 py-8 bg-gray-800 min-h-screen">
                    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-8">
                        <h1 className="text-4xl font-bold mb-6">{user.user.name}</h1>
                        <button
                            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4'
                            onClick={handleEditClick}
                        >
                            Edit Profile
                        </button>
                        <div className="overflow-x-auto">
                            <h2 className="text-3xl font-semibold mb-4">Your Orders</h2>
                            <div className="overflow-y-auto max-h-96 bg-gray-700 rounded-lg shadow-md">
                                <table className="min-w-full divide-y divide-gray-600">
                                    <thead className="bg-gray-600">
                                        <tr>
                                            <th className="p-4 text-left text-gray-100">Item</th>
                                            <th className="p-4 text-right text-gray-100">Quantity</th>
                                            <th className="p-4 text-right text-gray-100">Price</th>
                                            <th className="p-4 text-right text-gray-100">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                                        {orderedFood.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-4 text-gray-200">{item.food.name}</td>
                                                <td className="p-4 text-right text-gray-200">{item.quantity}</td>
                                                <td className="p-4 text-right text-gray-300">Rs.{item.food.price}</td>
                                                <td className="p-4 text-right text-gray-300">Rs.{item.food.price * item.quantity}</td>
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

                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleModalClose}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="container flex items-center justify-center flex-col min-h-screen bg-gray-800">
                    <h1 className='text-5xl text-center font-bold text-white'>Create Account First</h1>
                    <p className="mt-4">
                        <Link
                            to={'/'}
                            className='text-blue-400 text-2xl font-semibold hover:underline'
                        >
                            Go to main menu
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
