import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '✉️ Verify Your Email - Fantasy Luxe Account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
                    <h1>Fantasy Luxe</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Welcome to Fantasy Luxe!</h2>
                    <p>Thank you for signing up. Please verify your email address to activate your account and start shopping.</p>
                    <p style="margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verify Email
                        </a>
                    </p>
                    <p style="color: #666; font-size: 14px;">
                        Or copy this link: <br/>
                        <a href="${verificationUrl}" style="color: #0066cc;">${verificationUrl}</a>
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This link will expire in 24 hours.
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

export const sendResetPasswordEmail = async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🔑 Reset Your Password - Fantasy Luxe',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #000; color: white; padding: 20px; text-align: center;">
                    <h1>Fantasy Luxe</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset your password. Click the button below to set a new password.</p>
                    <p style="margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Password
                        </a>
                    </p>
                    <p style="color: #666; font-size: 14px;">
                        Or copy this link: <br/>
                        <a href="${resetUrl}" style="color: #0066cc;">${resetUrl}</a>
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This link will expire in 1 hour. If you didn't request this, please ignore this email.
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
