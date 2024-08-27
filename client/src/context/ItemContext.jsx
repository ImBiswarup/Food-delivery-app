import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/item/get-items');
            setFood(response.data.items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (newItem) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/api/item/add-items', newItem);
            if (response.status === 201) {
                setFood((prevFood) => [...prevFood, response.data.item]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        food,
        setFood,
        getItems,
        addItem,
        loading,
        error,
    };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
};

const useItem = () => {
    const context = useContext(ItemContext);
    if (context === undefined) {
        throw new Error('useItem must be used within an ItemContextProvider');
    }
    return context;
};

export { ItemContextProvider, useItem };
