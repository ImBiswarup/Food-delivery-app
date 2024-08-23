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

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

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

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Fetch user error:', error);
        return res.status(500).json({ message: "Server error." });
    }
};



module.exports = {
    signupHandler,
    loginHandler,
    fetchUser,
};
