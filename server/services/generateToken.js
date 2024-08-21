const jwt = require('jsonwebtoken');

const generateAuthToken = async (req, res, next) => {
    try {
        const { existingUser } = req;

        if (!existingUser) {
            return res.status(400).json({ msg: "User not provided" });
        }

        const payload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        existingUser.token = token;
        await existingUser.save();

        req.token = token;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = generateAuthToken;
