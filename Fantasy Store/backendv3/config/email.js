import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendVerificationOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '✉️ Your Fantasy Luxe Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
                    <h1>Fantasy Luxe</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Welcome to Fantasy Luxe!</h2>
                    <p>Thank you for signing up. Please use the verification code below to activate your account:</p>
                    <div style="background-color: #000; color: white; padding: 30px; text-align: center; margin: 30px 0; border-radius: 10px;">
                        <h1 style="margin: 0; font-size: 48px; letter-spacing: 5px;">${otp}</h1>
                    </div>
                    <p style="color: #666;">This code will expire in 10 minutes.</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        If you didn't sign up for Fantasy Luxe, please ignore this email.
                    </p>
                </div>
                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                    <p>© 2025 Fantasy Luxe. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
};

export const sendResetPasswordOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🔑 Your Fantasy Luxe Password Reset Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
                    <h1>Fantasy Luxe</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset your password. Please use the code below:</p>
                    <div style="background-color: #000; color: white; padding: 30px; text-align: center; margin: 30px 0; border-radius: 10px;">
                        <h1 style="margin: 0; font-size: 48px; letter-spacing: 5px;">${otp}</h1>
                    </div>
                    <p style="color: #666;">This code will expire in 10 minutes.</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        If you didn't request this, please ignore this email.
                    </p>
                </div>
                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                    <p>© 2025 Fantasy Luxe. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
};
