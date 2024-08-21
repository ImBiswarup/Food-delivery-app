const bcrypt = require('bcryptjs');
const User = require('../model/user');
const generateAuthToken = require('../services/generateToken');

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
                msg: "Missing credentials"
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const isPasswordConfirmed = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordConfirmed) {
            return res.status(401).json({
                msg: "Incorrect password"
            });
        }

        req.existingUser = existingUser;

        await generateAuthToken(req, res, () => {
            res.status(200).json({
                msg: "Login successful",
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    role: existingUser.role,
                    token: req.token
                }
            });
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    signupHandler,
    loginHandler
};
