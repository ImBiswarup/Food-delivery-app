const Item = require("../model/item");

const addItems = async (req, res) => {
    const { seller, name, price, category, imageUrl, description, ingredients, nutritionalInfo, rating, reviews, tags } = req.body
    // console.log("seller : ", seller);
    // console.log("name : ", name);
    // console.log("price : ", price);
    // console.log("category : ", category);
    // console.log("imageUrl : ", imageUrl);
    // console.log("description : ", description);
    // console.log("ingredients : ", ingredients);
    // console.log("nutritionalInfo : ", nutritionalInfo);
    // console.log("rating : ", rating);
    // console.log("reviews : ", reviews);
    // console.log("tags : ", tags);

    if (!name || !price || !category || !imageUrl || !description || !ingredients || !tags) {
        return res.json({
            msg: "Invalid Addition"
        })
    }

    const CreatedItem = await Item.create({
        seller, name, price, category, imageUrl, description, ingredients, nutritionalInfo, rating, reviews, tags
    })
    console.log("createdItems : ", CreatedItem);
    return res.json({ createdItem: CreatedItem, status: true, success: true })


};

const getItems = async (req, res) => {
    const allItems = await Item.find({});

    return res.json({
        items: allItems
    })
};

module.exports = { addItems, getItems }