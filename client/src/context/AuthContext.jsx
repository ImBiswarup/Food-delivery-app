import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
    // const decoded = cookies.token ? jwtDecode(cookies.token) : null;
    // console.log(decoded);

    // const [updatedName, setUpdatedName] = useState('');
    // const [updatedEmail, setUpdatedEmail] = useState('');
    // const [updatedRole, setUpdatedRole] = useState('');
    // const [updatedPass, setUpdatedPass] = useState('')


    useEffect(() => {
        const fetchUser = async () => {
            if (cookies.token) {
                try {
                    setLoading(true);
                    const decoded = jwtDecode(cookies.token);
                    setUser(decoded);

                    const response = await axios.get(
                        'http://localhost:3000/api/user/profile',
                        {
                            headers: {
                                Authorization: `Bearer ${cookies.token}`,
                            },
                        }
                    );

                    setUpdatedUser(response.data);
                } catch (err) {
                    setUser(null);
                } finally {
                    setLoading(false);
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
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setError('');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        removeCookie('token', { path: '/' });

    };



    const value = {
        user,
        signin,
        login,
        logout,
        error, name, email, password, role, setPassword, setEmail, setName, setRole, updatedUser
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
