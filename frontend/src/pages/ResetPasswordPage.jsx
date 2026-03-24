import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        try {
            await resetPassword(token, password);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
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
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
                <Input icon={Lock} type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <Input icon={Lock} type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
                
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}

                <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}>
                    {isLoading ? <Loader className="animate-spin" size={24} /> : "Set New Password"}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ResetPasswordPage;
