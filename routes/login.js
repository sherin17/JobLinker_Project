const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const adminCredentials = {
    email: 'admin@gmail.com',
    password: 'Admin@123'
};

router.post('/api/loginadmin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === adminCredentials.email && password === adminCredentials.password) {
            const payload = {
                email: email,
                password: password,
                date: Date.now()
            };

            const token = jwt.sign(payload, 'secretKey');
            res.send({ token });
        } else {
            return res.status(401).json({ message: "Invalid Username or Password!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
