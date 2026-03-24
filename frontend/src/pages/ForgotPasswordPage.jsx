import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword, error } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setIsSubmitted(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-container glass"
        >
            <h2>Forgot Password</h2>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", textAlign: "center" }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {error && <p className="error-message">{error}</p>}
                    
                    <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className="animate-spin" size={24} /> : "Send Reset Link"}
                    </motion.button>
                </form>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        style={{ width: "4rem", height: "4rem", backgroundColor: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}
                    >
                        <Mail style={{ color: "white", width: "2rem", height: "2rem" }} />
                    </motion.div>
                    <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                        If an account exists for {email}, you will receive a password reset link shortly.
                    </p>
                </div>
            )}

            <div className="auth-footer" style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
                <Link to="/login" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <ArrowLeft size={16} /> Back to Login
                </Link>
            </div>
        </motion.div>
    );
};

export default ForgotPasswordPage;
