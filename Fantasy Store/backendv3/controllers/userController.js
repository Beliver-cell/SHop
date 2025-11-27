import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail, sendResetPasswordEmail } from "../config/email.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.jwtSecret)
}

const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success:false, message: "User doesn't exist"})
        }
        if (!user.isVerified) {
            return res.json({ success:false, message: "Please verify your email first" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success:false, message: "Invalid password" });
        }
        else{
            const token = createToken(user._id);
            res.json({ success: true, token: token });
        }
    }
    catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({ success:false, message: "User already exists" });
        }
        if(!validator.isEmail(email)){
            return res.json({ success:false, message: "Please enter a valid email" });
        }
        if(password.length < 8){
            return res.json({ success:false, message: "Please enter a strong password (min 8 characters)"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = generateToken();

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpire: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });
        
        const user = await newUser.save();
        
        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationToken);
        
        if (emailSent) {
            res.json({ 
                success: true, 
                message: "Account created! Check your email to verify your account.",
                requiresVerification: true 
            });
        } else {
            // Delete user if email fails
            await userModel.findByIdAndDelete(user._id);
            return res.json({ success: false, message: "Failed to send verification email" });
        }

    }
    catch (error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Verify Email
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.json({ success: false, message: "No verification token provided" });
        }

        const user = await userModel.findOne({
            verificationToken: token,
            verificationTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired verification token" });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpire = null;
        await user.save();

        res.json({ success: true, message: "Email verified successfully! You can now login." });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const resetToken = generateToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        const emailSent = await sendResetPasswordEmail(email, resetToken);
        
        if (emailSent) {
            res.json({ success: true, message: "Password reset link sent to your email" });
        } else {
            return res.json({ success: false, message: "Failed to send reset email" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token || !newPassword) {
            return res.json({ success: false, message: "Token and new password required" });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired reset token" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        res.json({ success: true, message: "Password reset successfully! You can now login." });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.admin_Email && password === process.env.admin_Password){
            const token = jwt.sign(email + password, process.env.jwtSecret);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, verifyEmail, forgotPassword, resetPassword, adminLogin };
