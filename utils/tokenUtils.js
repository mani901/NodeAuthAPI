const jwt = require('jsonwebtoken');

const generateToken = (user, expiresIn = '1h') => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn,
    });
};

module.exports = { generateToken };