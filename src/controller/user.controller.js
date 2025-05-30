import { registerUser, loginUser } from '../services/auth.service.js';
import validator from 'validator';

const register = async (req, res) => {
    try {
        // Field validation
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required: name, email and password" 
            });
        }

        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (req.body.password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        await registerUser(req.body.name, req.body.email, req.body.password);
        
        res.status(201).json({ 
            success: true,
            message: 'User registered successfully' 
        });

    } catch (error) {
        console.error("Registration error:", error);
        
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const { token, user } = await loginUser(req.body.email, req.body.password);
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        
        if (error.message === 'User not found') {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default { register, login };