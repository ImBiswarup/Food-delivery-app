import React, { useState } from 'react';
import { useItem } from '../context/ItemContext';

const ItemForm = () => {
    const { addItem } = useItem();
    const [itemData, setItemData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        imageUrl: '',
        description: '',
        ingredients: '',
        nutritionalInfo: {
            calories: '',
            fat: '',
            protein: '',
        },
        rating: '',
        tags: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('nutritionalInfo')) {
            const info = name.split('.');
            setItemData((prevData) => ({
                ...prevData,
                nutritionalInfo: {
                    ...prevData.nutritionalInfo,
                    [info[1]]: value,
                },
            }));
        } else {
            setItemData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedItemData = {
            ...itemData,
            ingredients: itemData.ingredients.split(',').map(ingredient => ingredient.trim()),
            tags: itemData.tags.split(',').map(tag => tag.trim()),
            nutritionalInfo: {
                calories: parseFloat(itemData.nutritionalInfo.calories),
                fat: parseFloat(itemData.nutritionalInfo.fat),
                protein: parseFloat(itemData.nutritionalInfo.protein),
            },
            price: parseFloat(itemData.price),
            quantity: parseInt(itemData.quantity, 10),
            rating: parseFloat(itemData.rating),
        };

        try {
            await addItem(formattedItemData);
            alert('Item created successfully!');
            setItemData({
                name: '',
                price: '',
                quantity: '',
                category: '',
                imageUrl: '',
                description: '',
                ingredients: '',
                nutritionalInfo: {
                    calories: '',
                    fat: '',
                    protein: '',
                },
                rating: '',
                tags: '',
            });
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Failed to create item. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={itemData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={itemData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={itemData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={itemData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={itemData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={itemData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Ingredients (comma-separated)</label>
                    <input
                        type="text"
                        name="ingredients"
                        value={itemData.ingredients}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Nutritional Info</label>
                    <div className="space-y-2">
                        <input
                            type="number"
                            name="nutritionalInfo.calories"
                            placeholder="Calories"
                            value={itemData.nutritionalInfo.calories}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <input
                            type="number"
                            name="nutritionalInfo.fat"
                            placeholder="Fat"
                            value={itemData.nutritionalInfo.fat}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <input
                            type="number"
                            name="nutritionalInfo.protein"
                            placeholder="Protein"
                            value={itemData.nutritionalInfo.protein}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={itemData.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={itemData.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;
