const jwt = require('jsonwebtoken');
const { expressjwt: expressjwt } = require('express-jwt');

exports.login = (req, res) => {

    // user information
    const { username, password } = req.body;

    if (password === process.env.PASSWORD) {
        // can login
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" })
        return res.json({ token, username });
    }
    else {
        return res.status(400).json({ error: "Invalid password" })
    }
}

// check if user has already logged in
exports.requireLogin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
})