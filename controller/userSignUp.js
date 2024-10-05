const {User} = require("../modals/relation");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { username, email, password,role } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

   
        await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        res.status(200).json({ msg: "User Added" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = signup;