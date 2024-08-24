import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (cookies.token) {
                try {
                    const response = await axios.get('http://localhost:3000/api/user/profile', {
                        headers: {
                            Authorization: `Bearer ${cookies.token}`,
                        },
                    });
                    setUser(response.data);
                } catch (err) {
                    console.log('Error fetching user:', err);
                    setError(err.response?.data?.msg || 'Failed to fetch user');
                    setUser(null);
                }
            }
        };

        fetchUser();
    }, [cookies.token]);

    const signin = async () => {
        try {
            await axios.post('http://localhost:3000/api/user/signup', {
                name, email, password, role
            });
            setError('');
        } catch (err) {
            setError(err.response?.data?.msg || 'Sign up failed');
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', {
                email,
                password
            });
            setUser(response.data.user);
            setCookie('token', response.data.user.token, { path: '/' });
            setError('');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        removeCookie('token', { path: '/' });

    };

    const handlePayment = async () => {
        try {
            const token = cookies.token;

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

            const response = await axios.post('http://localhost:3000/api/user/add-order', {
                foodId: selectedItem.id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            );
            console.log("response.data: ", response.data);

            setSuccess('Order placed successfully!');
            // navigate('/')

        } catch (error) {
            console.error('Error adding ordered food:', error);
            setError(error.response?.data?.message || 'An error occurred while placing your order.');
        }
    };


    const value = {
        user,
        signin,
        login,
        logout,
        error, name, email, password, role, setPassword, setEmail, setName, setRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};

export { AuthContextProvider, useAuth };
