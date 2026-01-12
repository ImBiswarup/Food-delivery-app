import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const ProfilePage = () => {
    const { user, updatedUser } = useAuth();
    const [orderedFood, setOrderedFood] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies] = useCookies(["token"]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    // ----------------------------
    // Sync user data
    // ----------------------------
    useEffect(() => {
        if (updatedUser?.user) {
            setOrderedFood(updatedUser.user.orders || []);
            setName(updatedUser.user.name || "");
            setEmail(updatedUser.user.email || "");
            setRole(updatedUser.user.role || "");
        }
    }, [updatedUser]);

    // ----------------------------
    // Update profile
    // ----------------------------
    const updateUser = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/user/update/${updatedUser?.user?.id}`,
                { name, email, role },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );
            alert("Profile updated successfully");
            setIsModalOpen(false);
        } catch (err) {
            alert("Failed to update profile");
        }
    };

    // ----------------------------
    // Cart totals
    // ----------------------------
    const subtotal = orderedFood.reduce(
        (acc, item) => acc + item.food.price * item.quantity,
        0
    );

    const totalQuantity = orderedFood.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // ----------------------------
    // Razorpay UPI Payment
    // ----------------------------
    const handleRazorpayPayment = async () => {
        if (subtotal <= 0) {
            alert("Cart is empty");
            return;
        }

        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }

        try {
            const orderRes = await axios.post(
                "http://localhost:3000/api/payment/order",
                { amount: subtotal },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

            const options = {
                key: import.meta.env.VITE_APP_RAZORPAY_KEY,
                amount: orderRes.data.amount,
                currency: "INR",
                name: "Food Ordering App",
                description: "UPI Payment",
                order_id: orderRes.data.id,

                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
                upi: {
                    flow: "qr" // ✅ FORCE QR MODE
                },

                handler: async function (response) {
                    alert("Payment successful");

                    // TODO (IMPORTANT):
                    // Send response to backend for verification
                    // response.razorpay_payment_id
                    // response.razorpay_order_id
                    // response.razorpay_signature

                    setOrderedFood([]); // UI clear
                },

                modal: {
                    ondismiss: () => {
                        console.log("Payment cancelled");
                    },
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment initiation failed");
        }
    };

    // ----------------------------
    // UI
    // ----------------------------
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
                <h1 className="text-5xl text-white font-bold">
                    Create Account First
                </h1>
                <Link
                    to="/"
                    className="mt-4 text-blue-400 text-2xl font-semibold hover:underline"
                >
                    Go to main menu
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen p-6">
            <div className="bg-gray-900 text-white rounded-lg p-8 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">
                    {updatedUser?.user?.name}
                </h1>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6"
                    onClick={() => setIsModalOpen(true)}
                >
                    Edit Profile
                </button>

                {/* Orders */}
                <h2 className="text-3xl font-semibold mb-4">Your Orders</h2>

                <div className="overflow-y-auto max-h-96 bg-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="p-4 text-left">Item</th>
                                <th className="p-4 text-right">Qty</th>
                                <th className="p-4 text-right">Price</th>
                                <th className="p-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedFood.map((item, idx) => (
                                <tr key={idx} className="divide-y divide-gray-700">
                                    <td className="p-4">{item.food.name}</td>
                                    <td className="p-4 text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="p-4 text-right">
                                        ₹{item.food.price}
                                    </td>
                                    <td className="p-4 text-right">
                                        ₹{item.food.price * item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                    <div>
                        <p className="text-lg">Items: {totalQuantity}</p>
                        <p className="text-2xl font-bold">
                            Subtotal: ₹{subtotal}
                        </p>
                    </div>

                    <button
                        onClick={handleRazorpayPayment}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-bold"
                    >
                        Pay via UPI (QR)
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">
                            Edit Profile
                        </h2>

                        <input
                            className="w-full mb-3 p-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            className="w-full mb-3 p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            className="w-full mb-4 p-2 border rounded"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Role"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={updateUser}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
