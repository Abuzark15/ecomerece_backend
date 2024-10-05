const jwt = require('jsonwebtoken');
const {User }= require('../modals/relation');
const bcrypt = require('bcrypt');
const secretKey = 'Abuzar';

const Login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found." });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password is incorrect." });
        
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
        
        res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email, role: user.role }, token });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = Login;