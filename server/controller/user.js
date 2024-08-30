const bcrypt = require('bcryptjs');
const User = require('../model/user');
const jwt = require('jsonwebtoken');


const signupHandler = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                msg: "Missing credentials"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        console.log("createdUser: ", newUser);

        return res.status(201).json({
            msg: "User created successfully",
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({ msg: "Signup failed", error: error.message });
    }
};


const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: 'Missing credentials',
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                msg: 'User not found',
            });
        }

        const isPasswordConfirmed = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordConfirmed) {
            return res.status(401).json({
                msg: 'Incorrect password',
            });
        }

        const payload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        existingUser.token = token;
        await existingUser.save();

        console.log('Token generated:', token);
        console.log('User data:', existingUser);

        return res.status(200).json({
            msg: 'Login successful',
            user: {
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                token: token,
            },
        });
    } catch (error) {
        console.log('Login error:', error);
        next(error);
    }
};


const fetchUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id)
            .select('-password')
            .populate({
                path: 'orderedFoods.foodId',
                select: 'name price category imageUrl'
            });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const orders = user.orderedFoods.map(order => ({
            food: {
                id: order.foodId._id,
                name: order.foodId.name,
                price: order.foodId.price,
                category: order.foodId.category,
                imageUrl: order.foodId.imageUrl,
            },
            quantity: order.quantity,
        }));

        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                orders: orders,
            }
        });
    } catch (error) {
        console.error('Fetch user error:', error);
        return res.status(500).json({ message: "Server error." });
    }
};


const addOrderedFood = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.log("Invalid token.");
            return res.status(400).json({ message: "Invalid token." });
        }

        const { foodId, quantity } = req.body;

        if (!foodId || !quantity) {
            return res.status(400).json({ message: "Food ID and quantity are required." });
        }

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const existingOrder = user.orderedFoods.find(order => order.foodId.toString() === foodId);

        if (existingOrder) {
            existingOrder.quantity += quantity;
        } else {
            user.orderedFoods.push({ foodId, quantity });
        }

        await user.save();

        return res.status(200).json({
            message: "Food item added to orders.",
            orderedFoods: user.orderedFoods
        });
    } catch (error) {
        console.error('Add ordered food error:', error);
        return res.status(500).json({ message: "Server error." });
    }
};

const updateUser = async (req, res) => {
    try {
        // const { id } = req.params;
        const { name, email, password, role, id } = req.body;

        console.log(req.body);

        if (!id || (!name && !email && !password && !role)) {
            return res.status(400).json({ message: "Invalid request. Please provide valid user details." });
        }

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log("Received token: ", token);

        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const user = await User.findById(id);
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (role) user.role = role;

        await user.save();

        console.log(user);

        return res.status(200).json({
            msg: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        return res.status(500).json({ message: "Server error." });
    }
};



module.exports = {
    signupHandler,
    loginHandler,
    fetchUser,
    updateUser,
    addOrderedFood,
};




