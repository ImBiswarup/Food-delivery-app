export const FoodItems = [
    {
        id: 1,
        name: "Biriyani",
        price: 150,
        quantity: 50,
        category: "Main Course",
        imageUrl: "/images/biriyani.jpg",
        description: "A flavorful rice dish with mixed spices, meat, and vegetables.",
        ingredients: ["Basmati rice", "Chicken", "Yogurt", "Spices", "Onions"],
        nutritionalInfo: { calories: 500, fat: 20, protein: 25 },
        rating: 4.5,
        reviews: [
            { user: "John Doe", comment: "Delicious and aromatic!", rating: 5 },
            { user: "Jane Smith", comment: "A bit too spicy for my taste.", rating: 4 }
        ],
        tags: ["spicy", "rice", "main course", "Indian"]
    },
    {
        id: 2,
        name: "Pizza",
        price: 300,
        quantity: 30,
        category: "Main Course",
        imageUrl: "/images/pizza.jpg",
        description: "A classic pizza with a crispy crust, savory tomato sauce, and melted cheese.",
        ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Pepperoni"],
        nutritionalInfo: { calories: 800, fat: 35, protein: 30 },
        rating: 4.7,
        reviews: [
            { user: "Alice Johnson", comment: "Best pizza in town!", rating: 5 },
            { user: "Bob Brown", comment: "Good, but a bit greasy.", rating: 4 }
        ],
        tags: ["cheese", "main course", "Italian", "savory"]
    },
    {
        id: 3,
        name: "Burger",
        price: 120,
        quantity: 40,
        category: "Main Course",
        imageUrl: "/images/burger.jpg",
        description: "A juicy beef patty with fresh vegetables and a soft bun.",
        ingredients: ["Beef patty", "Lettuce", "Tomato", "Onions", "Cheese"],
        nutritionalInfo: { calories: 700, fat: 30, protein: 25 },
        rating: 4.6,
        reviews: [
            { user: "Michael Lee", comment: "The patty was cooked perfectly.", rating: 5 },
            { user: "Sarah Wilson", comment: "Too much mayonnaise.", rating: 4 }
        ],
        tags: ["beef", "main course", "American", "savory"]
    },
    {
        id: 4,
        name: "Pasta",
        price: 200,
        quantity: 25,
        category: "Main Course",
        imageUrl: "/images/pasta.jpg",
        description: "Creamy pasta with a rich tomato sauce and Parmesan cheese.",
        ingredients: ["Pasta", "Tomato sauce", "Parmesan cheese", "Garlic"],
        nutritionalInfo: { calories: 600, fat: 25, protein: 20 },
        rating: 4.4,
        reviews: [
            { user: "Emma Davis", comment: "Perfectly creamy and flavorful.", rating: 5 },
            { user: "Liam Brown", comment: "A bit too cheesy for my liking.", rating: 4 }
        ],
        tags: ["cheese", "main course", "Italian", "creamy"]
    },
    {
        id: 5,
        name: "Sandwich",
        price: 80,
        quantity: 60,
        category: "Snacks",
        imageUrl: "/images/sandwich.jpg",
        description: "A simple yet delicious sandwich with fresh ingredients.",
        ingredients: ["Bread", "Lettuce", "Tomato", "Turkey", "Cheese"],
        nutritionalInfo: { calories: 350, fat: 15, protein: 20 },
        rating: 4.2,
        reviews: [
            { user: "Jessica Taylor", comment: "Quick and tasty lunch option.", rating: 4 },
            { user: "Chris Evans", comment: "Could use more filling.", rating: 3 }
        ],
        tags: ["snack", "quick", "American", "savory"]
    },
    {
        id: 6,
        name: "Salad",
        price: 100,
        quantity: 35,
        category: "Appetizers",
        imageUrl: "/images/salad.jpg",
        description: "A refreshing salad with a mix of greens and vegetables.",
        ingredients: ["Lettuce", "Cucumber", "Tomato", "Olives", "Feta cheese"],
        nutritionalInfo: { calories: 150, fat: 10, protein: 5 },
        rating: 4.3,
        reviews: [
            { user: "Amanda Green", comment: "Very fresh and crunchy.", rating: 4 },
            { user: "David Miller", comment: "Needs a bit more dressing.", rating: 3 }
        ],
        tags: ["healthy", "vegetarian", "appetizer", "fresh"]
    },
    {
        id: 7,
        name: "Tacos",
        price: 180,
        quantity: 20,
        category: "Main Course",
        imageUrl: "/images/tacos.jpg",
        description: "Spicy tacos filled with seasoned meat and fresh toppings.",
        ingredients: ["Taco shells", "Ground beef", "Lettuce", "Cheese", "Salsa"],
        nutritionalInfo: { calories: 400, fat: 22, protein: 18 },
        rating: 4.6,
        reviews: [
            { user: "Sophie Turner", comment: "Great flavor and spice level.", rating: 5 },
            { user: "Daniel Radcliffe", comment: "A bit too spicy for me.", rating: 4 }
        ],
        tags: ["spicy", "Mexican", "main course", "savory"]
    },
    {
        id: 8,
        name: "Noodles",
        price: 140,
        quantity: 45,
        category: "Main Course",
        imageUrl: "/images/noodles.jpg",
        description: "Stir-fried noodles with vegetables and a savory sauce.",
        ingredients: ["Noodles", "Bell peppers", "Carrots", "Soy sauce", "Garlic"],
        nutritionalInfo: { calories: 550, fat: 20, protein: 15 },
        rating: 4.5,
        reviews: [
            { user: "Natalie Portman", comment: "Perfectly cooked and flavorful.", rating: 5 },
            { user: "Chris Hemsworth", comment: "Could use a bit more sauce.", rating: 4 }
        ],
        tags: ["Asian", "main course", "vegetarian", "savory"]
    },
    {
        id: 9,
        name: "Sushi",
        price: 350,
        quantity: 15,
        category: "Main Course",
        imageUrl: "/images/sushi.jpg",
        description: "Fresh sushi rolls with a variety of fillings and toppings.",
        ingredients: ["Sushi rice", "Seaweed", "Raw fish", "Vegetables"],
        nutritionalInfo: { calories: 300, fat: 8, protein: 20 },
        rating: 4.8,
        reviews: [
            { user: "Jared Leto", comment: "The freshest sushi I've had!", rating: 5 },
            { user: "Emma Watson", comment: "A bit pricey, but worth it.", rating: 4 }
        ],
        tags: ["Japanese", "main course", "fresh", "seafood"]
    },
    {
        id: 10,
        name: "Steak",
        price: 500,
        quantity: 10,
        category: "Main Course",
        imageUrl: "/images/steak.jpg",
        description: "A perfectly grilled steak with a juicy and tender texture.",
        ingredients: ["Beef steak", "Salt", "Pepper", "Garlic"],
        nutritionalInfo: { calories: 800, fat: 45, protein: 60 },
        rating: 4.9,
        reviews: [
            { user: "Hugh Jackman", comment: "Cooked to perfection!", rating: 5 },
            { user: "Jessica Alba", comment: "Too expensive for the portion size.", rating: 4 }
        ],
        tags: ["beef", "main course", "grilled", "savory"]
    },
    {
        id: 11,
        name: "Fried Chicken",
        price: 220,
        quantity: 30,
        category: "Main Course",
        imageUrl: "/images/fried_chicken.jpg",
        description: "Crispy and flavorful fried chicken with a golden crust.",
        ingredients: ["Chicken", "Flour", "Spices", "Oil"],
        nutritionalInfo: { calories: 650, fat: 35, protein: 30 },
        rating: 4.7,
        reviews: [
            { user: "Ryan Reynolds", comment: "The best fried chicken I've ever had.", rating: 5 },
            { user: "Scarlett Johansson", comment: "A bit too greasy for my taste.", rating: 4 }
        ],
        tags: ["fried", "main course", "American", "savory"]
    },
    {
        id: 12,
        name: "Kebab",
        price: 250,
        quantity: 20,
        category: "Main Course",
        imageUrl: "/images/kebab.jpg",
        description: "Grilled kebabs with tender meat and spices.",
        ingredients: ["Ground meat", "Spices", "Onions", "Bell peppers"],
        nutritionalInfo: { calories: 500, fat: 25, protein: 35 },
        rating: 4.6,
        reviews: [
            { user: "Zendaya", comment: "Delicious and perfectly seasoned.", rating: 5 },
            { user: "Tom Holland", comment: "A little dry but still good.", rating: 4 }
        ],
        tags: ["grilled", "main course", "spicy", "Middle Eastern"]
    },
    {
        id: 13,
        name: "Paneer Tikka",
        price: 180,
        quantity: 25,
        category: "Appetizers",
        imageUrl: "/images/paneer_tikka.jpg",
        description: "Grilled chunks of paneer marinated in spices.",
        ingredients: ["Paneer", "Yogurt", "Spices", "Bell peppers"],
        nutritionalInfo: { calories: 350, fat: 18, protein: 20 },
        rating: 4.4,
        reviews: [
            { user: "Priyanka Chopra", comment: "Great for vegetarians!", rating: 5 },
            { user: "Shahid Kapoor", comment: "A bit too spicy.", rating: 4 }
        ],
        tags: ["vegetarian", "appetizer", "Indian", "grilled"]
    },
    {
        id: 14,
        name: "Dosa",
        price: 90,
        quantity: 50,
        category: "Main Course",
        imageUrl: "/images/dosa.jpg",
        description: "Crispy and savory dosa served with chutneys and sambar.",
        ingredients: ["Rice", "Lentils", "Spices"],
        nutritionalInfo: { calories: 250, fat: 10, protein: 8 },
        rating: 4.3,
        reviews: [
            { user: "Anushka Sharma", comment: "Perfectly crispy and flavorful.", rating: 4 },
            { user: "Ranveer Singh", comment: "A bit dry, needs more chutney.", rating: 3 }
        ],
        tags: ["Indian", "main course", "crispy", "vegetarian"]
    },
    {
        id: 15,
        name: "Idli",
        price: 50,
        quantity: 70,
        category: "Main Course",
        imageUrl: "/images/idli.jpg",
        description: "Soft and fluffy steamed rice cakes served with chutneys.",
        ingredients: ["Rice", "Lentils", "Fermentation starter"],
        nutritionalInfo: { calories: 150, fat: 5, protein: 6 },
        rating: 4.6,
        reviews: [
            { user: "Akshay Kumar", comment: "Perfectly soft and fluffy.", rating: 5 },
            { user: "Kareena Kapoor", comment: "Needs more variety in chutneys.", rating: 4 }
        ],
        tags: ["Indian", "main course", "steamed", "vegetarian"]
    },
    {
        id: 16,
        name: "Chow Mein",
        price: 130,
        quantity: 40,
        category: "Main Course",
        imageUrl: "/images/chow_mein.jpg",
        description: "Stir-fried noodles with vegetables and a savory sauce.",
        ingredients: ["Noodles", "Vegetables", "Soy sauce", "Ginger"],
        nutritionalInfo: { calories: 550, fat: 18, protein: 15 },
        rating: 4.5,
        reviews: [
            { user: "Madhuri Dixit", comment: "Delicious and well-cooked.", rating: 4 },
            { user: "Ranbir Kapoor", comment: "A bit oily but tasty.", rating: 3 }
        ],
        tags: ["Asian", "main course", "vegetarian", "stir-fried"]
    },
    {
        id: 17,
        name: "Spring Rolls",
        price: 120,
        quantity: 35,
        category: "Appetizers",
        imageUrl: "/images/spring_rolls.jpg",
        description: "Crispy spring rolls filled with vegetables and served with dipping sauce.",
        ingredients: ["Spring roll wrappers", "Vegetables", "Soy sauce"],
        nutritionalInfo: { calories: 200, fat: 10, protein: 5 },
        rating: 4.4,
        reviews: [
            { user: "Aishwarya Rai", comment: "Crispy and delicious.", rating: 4 },
            { user: "Hrithik Roshan", comment: "Could use more filling.", rating: 3 }
        ],
        tags: ["vegetarian", "appetizer", "Asian", "crispy"]
    },
    {
        id: 18,
        name: "Fish Curry",
        price: 280,
        quantity: 15,
        category: "Main Course",
        imageUrl: "/images/fish_curry.jpg",
        description: "Spicy and tangy fish curry with aromatic spices.",
        ingredients: ["Fish", "Coconut milk", "Spices", "Tomatoes"],
        nutritionalInfo: { calories: 400, fat: 22, protein: 25 },
        rating: 4.7,
        reviews: [
            { user: "Deepika Padukone", comment: "Rich and flavorful.", rating: 5 },
            { user: "Shahrukh Khan", comment: "A bit too spicy for my taste.", rating: 4 }
        ],
        tags: ["spicy", "seafood", "main course", "Indian"]
    },
    {
        id: 19,
        name: "Mutton Curry",
        price: 320,
        quantity: 10,
        category: "Main Course",
        imageUrl: "/images/mutton_curry.jpg",
        description: "Hearty mutton curry with tender pieces of meat and spices.",
        ingredients: ["Mutton", "Spices", "Onions", "Tomatoes"],
        nutritionalInfo: { calories: 600, fat: 30, protein: 40 },
        rating: 4.8,
        reviews: [
            { user: "Saif Ali Khan", comment: "Perfectly cooked mutton!", rating: 5 },
            { user: "Kajol", comment: "A bit too oily.", rating: 4 }
        ],
        tags: ["spicy", "Indian", "main course", "hearty"]
    },
    {
        id: 20,
        name: "Butter Chicken",
        price: 270,
        quantity: 25,
        category: "Main Course",
        imageUrl: "/images/butter_chicken.jpg",
        description: "Creamy and rich butter chicken with a buttery tomato-based sauce.",
        ingredients: ["Chicken", "Butter", "Cream", "Tomato sauce", "Spices"],
        nutritionalInfo: { calories: 700, fat: 40, protein: 30 },
        rating: 4.9,
        reviews: [
            { user: "Katrina Kaif", comment: "Absolutely delicious and creamy.", rating: 5 },
            { user: "Varun Dhawan", comment: "A bit heavy but worth it.", rating: 4 }
        ],
        tags: ["Indian", "main course", "creamy", "rich"]
    },
];
