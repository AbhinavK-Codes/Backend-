import { User } from "../models/user.models.js";

export const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const normalizedEmail = email.toLowerCase();
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            username,
            email: normalizedEmail,
            password,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                user_id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("User registration failed:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                user_id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("User login failed:", error);
        res.status(500).json({ message: "Server error" });
    }
}
export const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide email" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("User logout failed:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
export default { registerUser, loginUser, logoutUser };
