import { transporter, sender } from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Verify your email",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Verify Your Email</h2>
                    <p>Thank you for signing up! Your verification code is:</p>
                    <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: #4CAF50; letter-spacing: 5px;">${verificationToken}</h1>
                    </div>
                    <p>Enter this code on the verification page to complete your registration.</p>
                    <p>This code will expire in 24 hours.</p>
                </div>
            `,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully", response.messageId);
    } catch (error) {
        console.error(`Error sending verification email: `, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Welcome to MERN Auth!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Welcome, ${name}!</h2>
                    <p>We're thrilled to have you on board.</p>
                    <p>Your account has been successfully verified, and you can now access all features.</p>
                </div>
            `,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully", response.messageId);
    } catch (error) {
        console.error(`Error sending welcome email: `, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Reset your password",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Reset Your Password</h2>
                    <p>You recently requested to reset your password. Click the button below to reset it:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                    </div>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                </div>
            `,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully", response.messageId);
    } catch (error) {
        console.error(`Error sending password reset email: `, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    try {
        const mailOptions = {
            from: sender,
            to: email,
            subject: "Password Reset Successful",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Password Reset Successful</h2>
                    <p>Your password has been successfully reset.</p>
                    <p>If you did not make this change, please contact support immediately.</p>
                </div>
            `,
        };

        const response = await transporter.sendMail(mailOptions);
        console.log("Password reset success email sent successfully", response.messageId);
    } catch (error) {
        console.error(`Error sending password reset success email: `, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};
