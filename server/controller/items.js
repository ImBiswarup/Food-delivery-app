const Item = require("../model/item");

const addItems = async (req, res) => {
    const { name, price, quantity, category, imageUrl, description, ingredients, nutritionalInfo, rating, reviews, tags } = req.body


    if (!name || !price || !quantity || !category || !imageUrl || !description || !ingredients || !tags) {
        return res.json({
            msg: "Invalid Addition"
        })
    }

    const CreatedItem = await Item.create({
        name, price, quantity, category, imageUrl, description, ingredients, nutritionalInfo, rating, reviews, tags
    })
    console.log(CreatedItem);
    return res.json({ createdItem: CreatedItem, status: true })


};

const getItems = async (req, res) => {
    const allItems = await Item.find({});

    return res.json({
        items: allItems
    })
};

module.exports = { addItems, getItems }